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
    // @IsNotEmpty()
    readonly usernameOrEmail?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    readonly password?: string = '';

}