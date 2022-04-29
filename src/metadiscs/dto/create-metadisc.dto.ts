export class CreateMetadiscDto {
    name!: string;
    uri!: string;
    status!: string;
    tokenId!: string;
    type!: string;
    version!: string;
    sub_type!: string;
    total_tracks!: string;
    thumbnail!: string;
    release_date!: Date;
    release_date_precision!: string;
    description!: string;
    location!: JSON;
}

