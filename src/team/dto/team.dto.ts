import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Pagable } from "@utils/commonDto";
import { IsOptional } from "class-validator";

export class GetListTeamDto extends Pagable {
  @ApiPropertyOptional()
  @IsOptional()
  readonly keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly skill_IN?: string[]
}