import {Team} from '@/team/team.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AwardsController} from './awards.controller';
import {Awards} from './awards.entity';
import {AwardsService} from './awards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Awards, Team])],
  controllers: [AwardsController],
  providers: [AwardsService],
  exports: [AwardsService],
})
export class AwardsModule {}
