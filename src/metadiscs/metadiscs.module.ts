import {Module} from '@nestjs/common';
import {MetadiscsService} from './metadiscs.service';
import {MetadiscsController} from './metadiscs.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
// import {Metadisc} from './entities/metadisc.entity';
import {MetadiscsRepository} from './metadiscs.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MetadiscsRepository])],
    controllers: [MetadiscsController],
    providers: [MetadiscsService],
})
export class MetadiscsModule {}

