import {SkillDistributionModule} from '@/skill-distribution/skill-distribution.module';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SkillModule} from '../skills/skills.module';
import {TeamController} from './team.controller';
import {Team} from './team.entity';
import {TeamService} from './team.service';

@Module({
    imports: [
        SkillModule,
        SkillDistributionModule,
        TypeOrmModule.forFeature([Team]),
    ],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamModule {}
