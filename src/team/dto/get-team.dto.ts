import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';
import { Pagable } from '../../utils/commonDto';

export class GetListTeamDto extends Pagable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly skillId?: number;

  @ApiProperty({required: true})
  @IsOptional()
  readonly timeZone?: string;
}