import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ISkillDistributionValue} from '../skill-distribution.entity';

export class UpdateSkillDistributionDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    readonly skillDistributionName!: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    skillDistributionValue?: ISkillDistributionValue[];
}
