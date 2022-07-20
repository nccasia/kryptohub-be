import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import {PrivacyEnum} from '../portfolio.enum';

export class CreatePortfolioDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  companyName?: string;

  @ApiProperty({required: true})
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({required: true})
  @IsOptional()
  videoLink?: string;

  @ApiProperty({required: true})
  @IsOptional()
  content?: string;

  @ApiProperty({required: true})
  @IsOptional()
  clientWebsite?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  title?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  category?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  estimate?: string;

  @ApiProperty({required: true})
  @IsOptional()
  startDate?: string;

  @ApiProperty({required: true})
  @IsOptional()
  endDate?: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  description?: string;

  @ApiProperty({required: true})
  @IsEnum(PrivacyEnum)
  @IsNotEmpty()
  readonly privacy?: PrivacyEnum;

  @ApiProperty({required: true})
  @IsOptional()
  @Type(() => Number)
  teamId?: number;
}
