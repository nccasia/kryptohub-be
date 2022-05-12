import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Length, Matches, MinLength} from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty()
    @IsNotEmpty({message: 'User name can not be empty'})
    username?: string;

    @ApiProperty()
    @IsNotEmpty()
    email?: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Password can not be empty'})
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
            'Password must contain at least 8 characters, includes lowercase, uppercase, number and special character',
    })
    password?: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Confirm password can not be empty'})
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: 'Password does not match ',
    })
    confirmPassword?: string;
}
