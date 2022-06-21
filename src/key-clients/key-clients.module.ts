import {Team} from '@/team/team.entity';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {KeyClientController} from './key-clients.controller';
import {KeyClient} from './key-clients.entity';
import {KeyClientService} from './key-clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeyClient, Team])],
  controllers: [KeyClientController],
  providers: [KeyClientService],
  exports: [KeyClientService],
})
export class KeyClientModule {}
