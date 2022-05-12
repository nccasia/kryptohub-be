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
import { IsUsernameAvailable } from '../../user/constraints/is-username-available.validator';

export class SignUpRegistration {
    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsNotEmpty()
    @Validate(IsUsernameAvailable)
    readonly username?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @Validate(IsEmailAvailable)
    readonly email?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    readonly password?: string = '';
}
