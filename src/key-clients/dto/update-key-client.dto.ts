import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsOptional} from 'class-validator';

export class UpdateKeyClientDto {
  @ApiProperty({required: true})
  @IsOptional()
  @IsArray()
  keyName?: string[];
}
