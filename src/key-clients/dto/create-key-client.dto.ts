import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsOptional} from 'class-validator';

export class CreateKeyClientDto {
  @ApiProperty({required: true})
  @IsOptional()
  @IsArray()
  keyName?: string[];
}
