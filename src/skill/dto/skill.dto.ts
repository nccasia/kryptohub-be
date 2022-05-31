import {ApiProperty} from '@nestjs/swagger';
import { Pagable } from '@utils/commonDto';
import {IsOptional} from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({required: true})
    @IsOptional()
    readonly skillName?: string;
}

export class GetListSkillDto extends Pagable {
  @ApiProperty({required: true})
  @IsOptional()
  readonly keyword?: string;
}
