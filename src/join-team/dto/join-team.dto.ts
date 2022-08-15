import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty, IsNumber} from 'class-validator';

export class AddContactJoinTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  teamId!: number;
}

export class AddUserContactJointeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  teamId!: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  userId!: number;
}
