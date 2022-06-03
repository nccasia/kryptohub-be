import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import { Pagable } from '../../utils/commonDto';

export class GetListUserDto extends Pagable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly skills?: string[];

  @ApiProperty({required: true})
  @IsOptional()
  readonly company?: string;
}