import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import {Focus} from '../../focus/focus.entity';
import {Skill} from '../../skill/entities/skill.entity';

export class CreateTeamDto {
    @ApiProperty()
    @IsOptional()
    teamName?: string;

    @ApiProperty()
    @IsOptional()
    teamSize?: string;

    @ApiProperty()
    @IsOptional()
    timeZone?: string;

    @ApiProperty()
    @IsOptional()
    organization?: string;

    @ApiProperty()
    @IsOptional()
    skills?: Skill[];

    @ApiProperty()
    @IsOptional()
    focus?: Focus[];

    @ApiProperty()
    @IsOptional()
    workingTime?: string;

    @ApiProperty()
    @IsOptional()
    hour?: string;

    @ApiProperty()
    @IsOptional()
    week?: string;

    @ApiProperty()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsOptional()
    avatar?: string;

    @ApiProperty()
    @IsOptional()
    avatarUrl?: string;

    @ApiProperty()
    @IsOptional()
    founded?: string;

    @ApiProperty()
    @IsOptional()
    linkWebsite?: string;

    @ApiProperty()
    @IsOptional()
    createAt?: Date;

    @ApiProperty()
    @IsOptional()
    updateAt?: Date;

    @ApiProperty()
    @IsOptional()
    projectSize?: string;

    @ApiProperty()
    @IsOptional()
    location?: string;

    @ApiProperty()
    @IsOptional()
    status?: boolean;
}
