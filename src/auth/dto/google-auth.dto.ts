import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class GoogleAuthDto {
    @ApiProperty({required: false})
    @IsOptional()
    readonly accessToken?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly googleAddress?: string = '';
}

export interface GoogleAuthReq {
    email: string;
    name: string;
}
