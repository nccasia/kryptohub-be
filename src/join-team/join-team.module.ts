import {TeamModule} from '@/team/team.module';
import {UserModule} from '@/user/user.module';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JoinTeamController} from './join-team.controller';
import {JoinTeam} from './join-team.entity';
import {JoinTeamService} from './join-team.service';

@Module({
  imports: [TypeOrmModule.forFeature([JoinTeam]), TeamModule, UserModule],
  providers: [JoinTeamService],
  controllers: [JoinTeamController],
})
export class JoinTeamModule {}
