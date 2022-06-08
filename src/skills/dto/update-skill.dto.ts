import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import {CreateSkillDto} from './create-skills.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @ApiProperty({required: true})
    @IsOptional()
    readonly skillName?: string;
}
