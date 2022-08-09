import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import {JoinTeamRole} from '../join-team.entity';

export class AddContactJoinTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  teamId!: number;

  @ApiProperty()
  @IsNotEmpty({each: true})
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => LobbyTeamDto)
  joinTeam!: LobbyTeamDto[];
}

export class LobbyTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(JoinTeamRole)
  role?: JoinTeamRole;
}
