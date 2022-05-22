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
    skill?: string;

    @ApiProperty()
    @IsOptional()
    workingTime?: string;

    @ApiProperty()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsOptional()
    avatar?: string;
}

export interface CreateTeamInterface {
    teamName?: string;
    quantity?: string;
    timeZone?: string;
    project?: string;
    skill?: string;
    workingTime?: string;
    description?: string;
    wallet?: string;
}
