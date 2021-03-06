import {IsEmailAvailable} from './../../user/constraints/is-email-available.validator';
import {ApiProperty} from '@nestjs/swagger';
import {
    IsDefined,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsOptional,
    Validate,
} from 'class-validator';

export class SignInRegistration {
    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsNotEmpty()
    readonly username?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    readonly password?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    readonly confirmPassword?: string = '';
}
