import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Pageable } from "@utils/commonDto";
import { IsOptional } from "class-validator";

export class GetListTeamDto extends Pageable {
  @ApiPropertyOptional()
  @IsOptional()
  readonly keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly skill_IN?: string[]

  @ApiPropertyOptional()
  @IsOptional()
  readonly timeZone_IN?: string[]
}