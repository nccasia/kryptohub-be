import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
import {IFocusValue} from '../focus.entity';

export class CreateFocusDto {
    @ApiProperty({required: false})
    @IsOptional()
    readonly focusName?: string = '';

    @ApiProperty()
    @IsOptional()
    focusValue?: IFocusValue[];
}
