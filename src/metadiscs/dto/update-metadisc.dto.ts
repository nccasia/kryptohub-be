import {IsOptional} from 'class-validator';

export class UpdateMetadiscDto {
    @IsOptional()
    name!: string;

    @IsOptional()
    uri!: string;

    @IsOptional()
    status!: string;

    @IsOptional()
    tokenId!: string;

    @IsOptional()
    type!: string;

    @IsOptional()
    version!: string;

    @IsOptional()
    sub_type!: string;

    @IsOptional()
    total_tracks!: string;

    @IsOptional()
    thumbnail!: string;

    // @IsOptional()
    //release_date: Date;

    // @IsOptional()
    // release_date_precision: string;

    @IsOptional()
    description!: string;

    @IsOptional()
    location!: JSON;
}

