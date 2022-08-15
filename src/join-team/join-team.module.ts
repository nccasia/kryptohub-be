import {Member} from '@/members/member.entity';
import {User} from '@/user/user.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JoinTeamController} from './join-team.controller';
import {JoinTeam} from './join-team.entity';
import {JoinTeamService} from './join-team.service';

@Module({
  imports: [TypeOrmModule.forFeature([JoinTeam, Member, User])],
  providers: [JoinTeamService],
  controllers: [JoinTeamController],
})
export class JoinTeamModule {}
