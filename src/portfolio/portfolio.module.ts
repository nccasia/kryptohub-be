import {Team} from '@/team/team.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PortfolioController} from './portfolio.controller';
import {Portfolio} from './portfolio.entity';
import {PortfolioService} from './portfolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, Team])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
