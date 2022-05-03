import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateMetadiscDto {
    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    uri!: string;

    @ApiProperty()
    @IsNotEmpty()
    status!: string;

    @ApiProperty()
    @IsNotEmpty()
    tokenId!: string;

    @ApiProperty()
    @IsNotEmpty()
    type!: string;

    @ApiProperty()
    @IsNotEmpty()
    version!: string;

    @ApiProperty()
    @IsNotEmpty()
    sub_type!: string;

    @ApiProperty()
    @IsNotEmpty()
    total_tracks!: string;

    @ApiProperty()
    @IsNotEmpty()
    thumbnail!: string;

    //@ApiProperty()
    //@IsNotEmpty()
    //release_date: Date;
    //@ApiProperty()
    //@IsNotEmpty()
    // release_date_precision: string;

    @ApiProperty()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({
        example: {
            street: '1555 Blake St',
            city: 'Denver',
            county: 'Denver',
            state: 'CO',
        },
    })
    @IsNotEmpty()
    location!: JSON;
}

