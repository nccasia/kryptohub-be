import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SkillDistributionController} from './skill-distribution.controller';
import {SkillDistribution} from './skill-distribution.entity';
import {SkillDistributionService} from './skill-distribution.service';

@Module({
    imports: [TypeOrmModule.forFeature([SkillDistribution])],
    controllers: [SkillDistributionController],
    providers: [SkillDistributionService],
    exports: [SkillDistributionService],
})
export class SkillDistributionModule {}
