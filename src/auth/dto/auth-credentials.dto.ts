import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({required: true})
    @IsOptional()
    readonly username?: string = '';

    @ApiProperty({required: true})
    @IsOptional()
    readonly emailAddress?: string = '';

    @ApiProperty({required: true})
    @IsOptional()
    readonly password?: string = '';

    @ApiProperty()
    @IsOptional()
    readonly confirmPassword?: string = '';
}
