import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class UpdateMetadiscDto {
    @ApiProperty()
    @IsOptional()
    name!: string;

    @ApiProperty()
    @IsOptional()
    uri!: string;

    @ApiProperty()
    @IsOptional()
    status!: string;

    @ApiProperty()
    @IsOptional()
    tokenId!: string;

    @ApiProperty()
    @IsOptional()
    type!: string;

    @ApiProperty()
    @IsOptional()
    version!: string;

    @ApiProperty()
    @IsOptional()
    sub_type!: string;

    @ApiProperty()
    @IsOptional()
    total_tracks!: string;

    @ApiProperty()
    @IsOptional()
    thumbnail!: string;

    //@ApiProperty()
    // @IsOptional()
    //release_date: Date;
    //@ApiProperty()
    // @IsOptional()
    // release_date_precision: string;

    @ApiProperty()
    @IsOptional()
    description!: string;

    @ApiProperty({
        example: {
            street: '1555 Blake St',
            city: 'Denver',
            county: 'Denver',
            state: 'CO',
        },
    })
    @IsOptional()
    location!: JSON;
}
