import { PartialType } from '@nestjs/swagger';
import { CreateMetadiscDto } from './create-metadisc.dto';

export class UpdateMetadiscDto extends PartialType(CreateMetadiscDto) {}
