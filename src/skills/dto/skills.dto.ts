import {ApiProperty} from '@nestjs/swagger';
import { Pageable } from '@utils/commonDto';
import {IsOptional} from 'class-validator';

export class CreateSkillDto {
    @ApiProperty({required: true})
    readonly skillName?: string;
}

export class GetListSkillDto extends Pageable {
  @ApiProperty({required: false})
  @IsOptional()
  readonly keyword?: string;
}
