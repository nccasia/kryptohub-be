import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class Pagable {
  @ApiProperty({required: false})
  @IsOptional()
  page?: number

  @ApiProperty({required: false})
  @IsOptional()
  size?: number

  @ApiProperty({required: false})
  @IsOptional()
  sort?: string
}

export interface Paging<T> {
  content: T[],
  pagable: {
    page: number,
    size: number,
    total: number
  }
}