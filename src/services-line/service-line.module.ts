import {Team} from '@/team/team.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ServiceLineController } from './service-line.controller';
import { ServiceLine } from './service-line.entity';
import { ServiceLineService } from './service-line.service';


@Module({
    imports: [TypeOrmModule.forFeature([ServiceLine, Team])],
    controllers: [ServiceLineController],
    providers: [ServiceLineService],
    exports: [ServiceLineService],
  })
  export class ServiceLineModule {}