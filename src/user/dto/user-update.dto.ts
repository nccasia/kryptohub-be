import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {Skill} from '../../skill/entities/skill.entity';

export class UserUpdate {
    @ApiProperty({required: false})
    @IsOptional()
    readonly username?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly company?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly emailAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly githubAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly googleAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly description?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly avatarPath?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly link?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly status?: string = 'isChanged';

    @ApiProperty({required: false})
    @IsOptional()
    readonly location?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly industry?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly headline?: string = '';

    @ApiProperty()
    @IsOptional()
    skills?: Skill[];
}
