import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class GithubRegistration {
    @ApiProperty({required: false})
    @IsOptional()
    readonly accessToken?: string = '';
}
