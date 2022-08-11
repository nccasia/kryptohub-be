import {InviteStatus, Member, MemberRole} from '@/members/member.entity';
import {User} from '@/user/user.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AddContactJoinTeamDto} from './dto/join-team.dto';
import {UpdateStatusJoinTeam} from './dto/update-status-join-team.dto';
import {JoinTeam} from './join-team.entity';
@Injectable()
export class JoinTeamService {
  constructor(
    @InjectRepository(JoinTeam)
    private readonly joinTeamRepository: Repository<JoinTeam>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async addContactJoinTeam(
    addContactJoinTeam: AddContactJoinTeamDto,
    user: User,
  ) {
    try {
      const joinTeamData = new JoinTeam();
      joinTeamData.emailAddress = user.emailAddress!;
      joinTeamData.teamId = addContactJoinTeam.teamId!;
      joinTeamData.userId = user.id!;
      const joinTeam = await this.joinTeamRepository.save(joinTeamData);
      return joinTeam;
    } catch (error) {
      throw new HttpException('Error cannot join team', HttpStatus.NOT_FOUND);
    }
  }

  async getAllUserContactJoinTeams(): Promise<JoinTeam[]> {
    const result = await this.joinTeamRepository.find();
    return result;
  }

  async updateStatusJoinTeam(
    id: number,
    updateStatusJoinTeam: UpdateStatusJoinTeam,
  ) {
    try {
      const joinTeamData = await this.joinTeamRepository.findOne(id);
      if (!joinTeamData) {
        throw new HttpException(
          `There isn't any service line with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const result = await this.joinTeamRepository.save({
        id: id,
        verified: true,
        isApproved: updateStatusJoinTeam.isApproved == true,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        `Can not find with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteContactJoinTeam(id: number): Promise<void> {
    const result = await this.joinTeamRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    throw new HttpException('Delete success', HttpStatus.OK);
  }

  async getTeamById(teamId: number) {
    const team = await this.joinTeamRepository.find({
      where: {teamId: teamId, verified: false},
    });
    return team;
  }

  async addUserContactJointeam(
    user: User,
    addContactJoinTeam: AddContactJoinTeamDto,
  ) {
    const member = new Member();
    const jointeam = new JoinTeam();
    jointeam.userId = user.id!;
    jointeam.teamId = addContactJoinTeam.teamId;

    member.role = MemberRole.MEMBER;
    member.emailAddress = user.emailAddress as string;
    member.inviteStatus = InviteStatus.ACCEPTED;
    member.user = jointeam.userId as any;
    member.team = jointeam.teamId as any;
    const addToList = await this.memberRepository.save(member);

    const {user: userData, team, ...result} = addToList;
    return {
      ...result,
      userId: jointeam.userId,
      teamId: jointeam.teamId,
    };
  }
}
