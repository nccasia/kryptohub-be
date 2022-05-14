import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Validate} from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    username?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    email?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    password?: string;

    @ApiProperty()
    @IsNotEmpty()
    confirmPassword?: string;
}
