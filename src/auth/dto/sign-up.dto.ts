import {IsEtherAddress} from './../../user/constraints/is-ether-address';
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

export class SignUp {
    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    readonly name?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsEmail()
    // @Validate(IsUserAlreadyExist)
    readonly emailAddress?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    // @MinLength(8)
    readonly password?: string = '';
}
