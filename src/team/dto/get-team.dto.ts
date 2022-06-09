import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { Pageable } from '../../utils/commonDto';

export class GetListTeamPagingDto extends Pageable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly skillId?: number;

  @ApiProperty({required: true})
  @IsOptional()
  readonly timeZone?: string;
}