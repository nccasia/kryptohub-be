import {Team} from '@/team/team.entity';
import {TeamService} from '@/team/team.service';
import {User} from '@/user/user.entity';
import {UserService} from '@/user/user.service';
import {MailerService} from '@nestjs-modules/mailer';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {Repository} from 'typeorm';
import {InviteStatus, Member, MemberRole} from './member.entity';
import {
  AddTeamMembersDto,
  GetListTeamMemberDto,
  InviteMemberDto,
} from './members.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async getList(
    user: User,
    queryData: GetListTeamMemberDto,
  ): Promise<Paging<Team>> {
    const {teamId, page, size, sort} = queryData;

    const team = await this.teamService.anyUserTeam({userId: user.id, teamId});

    if (!team) throw new NotFoundException();

    const paging = formatPaging(page, size, sort)
    const [list, total] = await this.memberRepository.findAndCount({
      relations: ['user'],
      where: {team: {id: team.id}},
      take: paging.query.take,
      skip: paging.query.skip,
    });

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
    console.log(team);

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

    const member = await this.memberRepository.findOne({
      relations: ['user'],
      where: {emailAddress: email, team: {id: team.id}},
    });
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
    this.sendInvitationEmail({email});
    return newMember
  }

  async sendInvitationEmail({email}) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitation',
      template: 'invitation',
    });
  }
}

