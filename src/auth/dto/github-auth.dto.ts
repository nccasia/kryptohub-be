import {ApiProperty} from '@nestjs/swagger';
import {
    IsDefined,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsOptional,
    Validate,
} from 'class-validator';

export class GithubRegistration {
    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    readonly accessToken?: string = '';

    @ApiProperty({required: false})
    // @IsDefined()
    @IsOptional()
    // @IsNotEmpty()
    readonly emailAddress?: string = '';

}