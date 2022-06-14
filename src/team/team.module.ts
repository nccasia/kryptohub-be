import {AwardsModule} from '@/awards/awards.module';
import {KeyClientModule} from '@/key-clients/key-clients.module';
import {PortfolioModule} from '@/portfolio/portfolio.module';
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
    PortfolioModule,
    AwardsModule,
    KeyClientModule,
    TypeOrmModule.forFeature([Team]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
