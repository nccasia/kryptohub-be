import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

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
    skill?: string[];

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
    userId?: number;

    @ApiProperty()
    @IsOptional()
    avatar?: string;

    @ApiProperty()
    @IsOptional()
    avatarUrl?: string;
}
