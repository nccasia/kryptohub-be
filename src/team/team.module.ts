import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FocusModule} from '../focus/focus.module';
import {SkillModule} from '../skill/skill.module';
import {TeamController} from './team.controller';
import {Team} from './team.entity';
import {TeamService} from './team.service';

@Module({
    imports: [SkillModule, FocusModule, TypeOrmModule.forFeature([Team])],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamModule {}
