import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateServiceLineDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  name?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  value?: string[];
}
