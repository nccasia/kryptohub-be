import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({required: false})
    @IsOptional()
    skillId?: number;

    @ApiProperty({required: false})
    @IsOptional()
    readonly skillName?: string = '';
}

