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
import {
  AddContactJoinTeamDto,
  AddUserContactJointeamDto,
} from './dto/join-team.dto';
import {UpdateStatusJoinTeam} from './dto/update-status-join-team.dto';
import {JoinTeam} from './join-team.entity';
@Injectable()
export class JoinTeamService {
  constructor(
    @InjectRepository(JoinTeam)
    private readonly joinTeamRepository: Repository<JoinTeam>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addContactJoinTeam(
    addContactJoinTeam: AddContactJoinTeamDto,
    user: User,
  ) {
    const joinTeamData = new JoinTeam();
    const result = await this.joinTeamRepository.find({
      where: {userId: user.id},
    });

    if (result.length > 0)
      throw new HttpException(
        'You have already sent request to join team',
        HttpStatus.BAD_REQUEST,
      );
    joinTeamData.emailAddress = user.emailAddress!;
    joinTeamData.teamId = addContactJoinTeam.teamId!;
    joinTeamData.userId = user.id!;
    joinTeamData.username = user.username;
    const joinTeam = await this.joinTeamRepository.save(joinTeamData);
    return joinTeam;
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
    const result = await this.joinTeamRepository.delete(id);
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
    addUserContactJointeamDto: AddUserContactJointeamDto,
  ) {
    const member = new Member();
    const jointeam = new JoinTeam();
    const users = await this.userRepository.findOne({
      where: {id: addUserContactJointeamDto.userId},
    });

    jointeam.userId = addUserContactJointeamDto.userId;
    jointeam.teamId = addUserContactJointeamDto.teamId;

    member.role = MemberRole.MEMBER;
    member.emailAddress = users?.emailAddress!;
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
