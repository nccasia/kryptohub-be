import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateServiceLineDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    name?: string;
  
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsArray()
    value?: string[];
  }
  