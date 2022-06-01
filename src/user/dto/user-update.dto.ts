import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UserUpdate {
    @ApiProperty({required: false})
    @IsOptional()
    readonly username?: string = '';

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
    readonly avatarPath?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly status?: string = 'isChanged';

    @ApiProperty()
    @IsOptional()
    skills?: Skill[];
}
