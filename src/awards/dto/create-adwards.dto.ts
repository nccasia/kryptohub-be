import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class CreateAwardsDto {
  @ApiProperty({required: true})
  @IsOptional()
  awardsTitle?: string;

  @ApiProperty({required: true})
  @IsOptional()
  awardsWebsite?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  @Type(() => Number)
  teamId!: number;
}
