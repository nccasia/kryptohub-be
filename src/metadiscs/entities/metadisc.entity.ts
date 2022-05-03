import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Metadisc {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    uri!: string;

    @Column()
    status!: string;

    @Column()
    tokenId!: string;

    @Column()
    type!: string;

    @Column()
    version!: string;

    @Column()
    sub_type!: string;

    @Column()
    total_tracks!: string;

    @Column()
    thumbnail!: string;

    @Column()
    release_date!: Date;

    @Column()
    release_date_precision!: string;

    @Column()
    description!: string;

    @Column({type: 'json'})
    location!: JSON;
}

