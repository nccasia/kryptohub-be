import {ApiProperty} from '@nestjs/swagger';
import { Pagable } from '@utils/commonDto';
import {IsOptional} from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({required: true})
    readonly skillName?: string;
}

export class GetListSkillDto extends Pagable {
  @ApiProperty({required: false})
  @IsOptional()
  readonly keyword?: string;
}