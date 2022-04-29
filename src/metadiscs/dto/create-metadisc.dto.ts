import {IsNotEmpty} from 'class-validator';

export class CreateMetadiscDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    uri!: string;

    @IsNotEmpty()
    status!: string;

    @IsNotEmpty()
    tokenId!: string;

    @IsNotEmpty()
    type!: string;

    @IsNotEmpty()
    version!: string;

    @IsNotEmpty()
    sub_type!: string;

    @IsNotEmpty()
    total_tracks!: string;

    @IsNotEmpty()
    thumbnail!: string;

    // @IsNotEmpty()
    //release_date: Date;

    // @IsNotEmpty()
    // release_date_precision: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    location!: JSON;
}

