import {ApiProperty} from '@nestjs/swagger';
import {

    IsOptional,
} from 'class-validator';

export class SignUp {
    @ApiProperty({required: false})
    @IsOptional()
    readonly name?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly emailAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly password?: string = '';
}
