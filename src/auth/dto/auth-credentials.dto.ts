import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsOptional} from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({required: true})
    @IsOptional()
    readonly username?: string = '';

    @ApiProperty({required: true})
    @IsOptional()
    @IsEmail()
    readonly emailAddress?: string = '';

    @ApiProperty({required: true})
    @IsOptional()
    readonly password?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly confirmPassword?: string = '';
}
