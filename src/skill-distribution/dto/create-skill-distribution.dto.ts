import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {ISkillDistributionValue} from '../skill-distribution.entity';

export class CreateSkillDistributionDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  readonly skillDistributionName!: string;

  @ApiProperty({required: true})
  @IsOptional()
  skillDistributionValue?: ISkillDistributionValue[];
}
