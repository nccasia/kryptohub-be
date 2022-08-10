import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean} from 'class-validator';

export class UpdateStatusJoinTeam {
  @ApiProperty()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty()
  @IsBoolean()
  isApproved?: boolean;
}
