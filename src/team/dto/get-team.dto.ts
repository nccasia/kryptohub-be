import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { Pagable } from '../../utils/commonDto';

export class GetListTeamPagingDto extends Pagable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly skillId?: number;

  @ApiProperty({required: true})
  @IsOptional()
  readonly timeZone?: string;
}