import {Team} from '@/team/team.entity';
import {TeamService} from '@/team/team.service';
import {User} from '@/user/user.entity';
import {UserService} from '@/user/user.service';
import {MailerService} from '@nestjs-modules/mailer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {Repository} from 'typeorm';
import {InviteStatus, Member, MemberRole} from './member.entity';
import {
  AddTeamMembersDto,
  DeleteMemberDto,
  GetListTeamMemberDto,
  InviteMemberDto,
  JoinTeamDto,
} from './members.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async getList(
    user: User,
    queryData: GetListTeamMemberDto,
  ): Promise<Paging<Team>> {
    const {teamId, page, size, sort} = queryData;

    const team = await this.teamService.anyUserTeam({userId: user.id, teamId});

    if (!team) throw new NotFoundException();

    const paging = formatPaging(page, size, sort);
    const [list, total] = await this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.user', 'user')
      .where(`"teamId" = :id`, {id: team.id})
      .take(paging.query.take)
      .skip(paging.query.skip)
      .getManyAndCount();

    return {
      content: list,
      pageable: {
        total,
        ...paging.pageable,
      },
    };
  }

  async addTeamMembers(user: User, data: AddTeamMembersDto) {
    const {teamId, members} = data;

    const team = await this.teamService.anyUserTeam({userId: user.id, teamId});

    if (!team) throw new HttpException('Team not found', HttpStatus.NOT_FOUND);

    await Promise.all(
      members.map(async (member) => {
        return await this.inviteMember(team, member);
      }),
    );
    return;
  }

  async inviteMember(team: Team, data: InviteMemberDto) {
    const {email, role = MemberRole.MEMBER} = data;
    const user = await this.userService.any({where: {emailAddress: email}});

    const member = await this.memberRepository
      .createQueryBuilder('member')
      .where(`"emailAddress" = :email`, {email})
      .andWhere(`"teamId" = :teamId`, {teamId: team.id})
      .getOne();
    if (member) return member;

    let newMember: Member = new Member({
      team,
      emailAddress: email,
      role,
      inviteStatus: InviteStatus.PENDING,
    });

    if (user) {
      newMember.user = user;
      await newMember.save();
    } else {
      await newMember.save();
    }

    this.mailerService.sendMail({
      to: email,
      subject: 'Invitation',
      template: 'invitation',
      context: {
        teamName: team.teamName,
        role,
        joinTeamLink:
          this.configService.get('FE_HOST') + `/join-team?teamId=${team.id}`,
        contact: 'kryptohub.co',
      },
    });
    return newMember;
  }

  async joinTeam(user: User, data: JoinTeamDto) {
    const invitation = await this.memberRepository.findOne({
      where: {
        emailAddress: user.emailAddress,
        team: {id: data.teamId},
        inviteStatus: InviteStatus.PENDING,
      },
    });

    if (!invitation) throw new NotFoundException('not found invitation');

    invitation.inviteStatus = InviteStatus.ACCEPTED;
    await invitation.save();

    return invitation;
  }

  async removeMember(user: User, query: DeleteMemberDto){
    const team = await this.teamService.anyUserTeam({userId: user.id, teamId: query.teamId})
    if(!team) throw new NotFoundException('Team not found')

    const member = await this.memberRepository.findOne({where: {
      id: query.memberId,
      team: {
        id: query.teamId
      }
    }})

    if(!member) throw new NotFoundException('Member not found')

    await this.memberRepository.softDelete(member.id)
  }
}
