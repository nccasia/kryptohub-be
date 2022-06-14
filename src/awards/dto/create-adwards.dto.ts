import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class CreateAwardsDto {
  @ApiProperty({required: true})
  @IsOptional()
  awardsTitle?: string;

  @ApiProperty({required: true})
  @IsOptional()
  awardsWebsite?: string;
}
