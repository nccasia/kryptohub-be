import { Injectable } from '@nestjs/common';
import { CreateMetadiscDto } from './dto/create-metadisc.dto';
import { UpdateMetadiscDto } from './dto/update-metadisc.dto';

@Injectable()
export class MetadiscsService {
  create(createMetadiscDto: CreateMetadiscDto) {
    return 'This action adds a new metadisc';
  }

  findAll() {
    return `This action returns all metadiscs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metadisc`;
  }

  update(id: number, updateMetadiscDto: UpdateMetadiscDto) {
    return `This action updates a #${id} metadisc`;
  }

  remove(id: number) {
    return `This action removes a #${id} metadisc`;
  }
}
