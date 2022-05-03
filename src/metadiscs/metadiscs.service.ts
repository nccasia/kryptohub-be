import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateMetadiscDto} from './dto/create-metadisc.dto';
import {UpdateMetadiscDto} from './dto/update-metadisc.dto';
import {MetadiscsRepository} from './metadiscs.repository';

@Injectable()
export class MetadiscsService {
    constructor(
        @InjectRepository(MetadiscsRepository)
        private metadiscsRepository: MetadiscsRepository,
    ) {}

    async create(createMetadiscDto: CreateMetadiscDto) {
        return await this.metadiscsRepository.createMetadisc(createMetadiscDto);
    }

    async findAll() {
        return await this.metadiscsRepository.findAll();
    }

    async findOne(id: number) {
        return await this.metadiscsRepository.findById(id);
    }

    async update(id: number, updateMetadiscDto: UpdateMetadiscDto) {
        return await this.metadiscsRepository.updateMetadisc(
            id,
            updateMetadiscDto,
        );
    }

    async remove(id: number) {
        return await this.metadiscsRepository.destroy(id);
    }
}

