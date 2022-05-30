import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({required: false})
    @IsOptional()
    id?: number;

    @ApiProperty({required: false})
    @IsOptional()
    readonly skillName?: string = '';
}

