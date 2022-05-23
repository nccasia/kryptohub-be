import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UserUpdate {
    @ApiProperty({required: false})
    @IsOptional()
    // @IsDefined()
    // @IsString()
    // @IsNotEmpty()
    readonly username?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    // @IsDefined()
    // @IsString()
    // @IsNotEmpty()
    readonly emailAddress?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    // @IsDefined()
    // @IsString()
    // @IsNotEmpty()
    readonly github?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    // @IsDefined()
    // @IsString()
    // @IsNotEmpty()
    readonly google?: string = '';

    @ApiProperty({required: false})
    @IsOptional()
    // @IsDefined()
    // @IsString()
    // @IsNotEmpty()
    readonly status?: string = 'isChanged';
}
