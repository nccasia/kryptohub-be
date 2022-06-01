import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import {ISkillDistributionValue} from '../skill-distribution.entity';

export class CreateSkillDistributionDto {
    @ApiProperty({required: false})
    @IsOptional()
    readonly skillDistributionName?: string = '';

    @ApiProperty()
    @IsOptional()
    skillDistributionValue?: ISkillDistributionValue[];
}
