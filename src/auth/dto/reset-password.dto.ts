import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';

export class SendMailResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password must includes lowercase, uppercase, number and special character',
  })
  password!: string;
}
