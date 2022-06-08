import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsOptional} from 'class-validator';
import {PrivacyEnum} from '../portfolio.enum';

export class UpdatePortfolioDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    companyName?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    imageUrl?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    videoLink?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    content?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
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
    @IsNotEmpty()
    startDate?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    endDate?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    description?: string;

    @ApiProperty({required: true})
    @IsEnum(PrivacyEnum)
    @IsOptional()
    privacy?: PrivacyEnum;
}
