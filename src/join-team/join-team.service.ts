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
    const joinTeam = await this.joinTeamRepository.save({
      id: user.id,
    })
  }

  // async joinTeam(team: Team, data: LobbyTeamDto) {
  //   const {email, role = JoinTeamRole.NOT_ROLE} = data;
  //   const user = await this.userService.findOne({where: {emailAddress: email}});
  // }
}
