import {ApiProperty} from '@nestjs/swagger';
import {
    IsDefined,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsOptional,
} from 'class-validator';

export class SignInRegistration {
    @ApiProperty({required: false})
    @IsOptional()

    readonly usernameOrEmail?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly password?: string = '';

}