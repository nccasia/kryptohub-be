import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class GoogleAuthDto {
    @ApiProperty({required: false})
    @IsOptional()
    readonly accessToken?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly emailAddress?: string = '';
}

export interface GoogleAuthReq {
    emailAddress: string;
    name: string;
}
