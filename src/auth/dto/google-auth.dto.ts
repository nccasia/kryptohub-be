import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class GoogleAuthDto {
    @ApiProperty({required: false})
    @IsOptional()
    readonly accessToken?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly email?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly firstName?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly lastName?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly displayName?: string = '';
}

export interface GoogleAuthReq {
    email: string;
    name: string;
    given_name: string;
    family_name: string;
}
