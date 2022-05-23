import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UserUpdate {
    @ApiProperty({required: false})
    @IsOptional()
    readonly username?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly emailAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly github?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly google?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    readonly status?: string = 'isChanged';
}
