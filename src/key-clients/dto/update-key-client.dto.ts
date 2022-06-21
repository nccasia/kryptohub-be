import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsArray, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateKeyClientDto {
  @ApiProperty({required: true})
  @IsOptional()
  @IsArray()
  keyName?: string[];

  @ApiProperty({required: true})
  @IsNotEmpty()
  @Type(() => Number)
  teamId!: number;
}
