import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { Pageable } from '../../utils/commonDto';

export class GetListUserDto extends Pageable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly skills?: string[];

  @ApiProperty({required: true})
  @IsOptional()
  readonly company?: string;
}