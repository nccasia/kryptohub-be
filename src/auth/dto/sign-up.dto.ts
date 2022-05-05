import { IsEtherAddress } from './../../user/constraints/is-ether-address';
import { IsWalletAvailable } from '../../user/constraints/is-wallet-available.validatr';
import { IsEmailAvailable } from './../../user/constraints/is-email-available.validator';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsOptional,
    Validate,
} from 'class-validator';

export class SignUp {
    @ApiProperty({ required: false })
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    readonly name?: string = '';

    @ApiProperty({ required: false })
    // @IsDefined()
    @IsOptional()
    // @IsEmail()
    // @Validate(IsUserAlreadyExist)
    readonly email?: string = '';

    @ApiProperty({ required: false })
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    // @MinLength(8)
    readonly password?: string = '';

    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    @Validate(IsEtherAddress)
    @Validate(IsWalletAvailable)
    readonly walletAddress!: string;
}
