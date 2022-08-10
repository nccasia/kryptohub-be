import {Team} from '@/team/team.entity';
import {TeamService} from '@/team/team.service';
import {User} from '@/user/user.entity';
import {UserService} from '@/user/user.service';
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
    private readonly teamService: TeamService,
    private readonly userService: UserService,
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
        verified: updateStatusJoinTeam.verified == true,
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
}
