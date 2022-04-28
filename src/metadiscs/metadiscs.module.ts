import { Module } from '@nestjs/common';
import { MetadiscsService } from './metadiscs.service';
import { MetadiscsController } from './metadiscs.controller';

@Module({
  controllers: [MetadiscsController],
  providers: [MetadiscsService]
})
export class MetadiscsModule {}
