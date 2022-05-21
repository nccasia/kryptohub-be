import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class CreateTeamDto {
    @ApiProperty()
    @IsOptional()
    readonly teamName?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly quantity?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly timeZone?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly project?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly skill?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly workingTime?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly description?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly wallet?: string = '';
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
