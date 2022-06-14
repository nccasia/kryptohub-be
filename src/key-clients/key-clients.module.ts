import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {KeyClientController} from './key-clients.controller';
import {KeyClient} from './key-clients.entity';
import {KeyClientService} from './key-clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeyClient])],
  controllers: [KeyClientController],
  providers: [KeyClientService],
  exports: [KeyClientService],
})
export class KeyClientModule {}
