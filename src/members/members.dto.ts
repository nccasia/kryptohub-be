import {ApiProperty} from '@nestjs/swagger';
import { Pageable } from '@utils/commonDto';
import {Type} from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MemberRole } from './member.entity';

export class AddTeamMembersDto {
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
  @Type(() => InviteMemberDto)
  members!: InviteMemberDto[];
}

export class InviteMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MemberRole)
  role!: MemberRole
}

export class GetListTeamMemberDto extends Pageable {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  teamId!: number
}