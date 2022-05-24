import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import {CreateSkillDto} from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @ApiProperty({required: false})
    @IsOptional()
    readonly skillName?: string = '';
}

