import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetadiscsService } from './metadiscs.service';
import { CreateMetadiscDto } from './dto/create-metadisc.dto';
import { UpdateMetadiscDto } from './dto/update-metadisc.dto';

@Controller('metadiscs')
export class MetadiscsController {
  constructor(private readonly metadiscsService: MetadiscsService) {}

  @Post()
  create(@Body() createMetadiscDto: CreateMetadiscDto) {
    return this.metadiscsService.create(createMetadiscDto);
  }

  @Get()
  findAll() {
    return this.metadiscsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metadiscsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetadiscDto: UpdateMetadiscDto) {
    return this.metadiscsService.update(+id, updateMetadiscDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metadiscsService.remove(+id);
  }
}
