import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class UpdateAwardsDto {
  @ApiProperty({required: true})
  @IsOptional()
  awardsTitle?: string;

  @ApiProperty({required: true})
  @IsOptional()
  awardsWebsite?: string;
}
