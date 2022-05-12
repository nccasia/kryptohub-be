import {MigrationInterface, QueryRunner} from "typeorm";

export class createMetadiscs1651603691853 implements MigrationInterface {
    name = 'createMetadiscs1651603691853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metadisc" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uri" character varying NOT NULL, "status" character varying NOT NULL, "tokenId" character varying NOT NULL, "type" character varying NOT NULL, "version" character varying NOT NULL, "sub_type" character varying NOT NULL, "total_tracks" character varying NOT NULL, "thumbnail" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "release_date_precision" character varying NOT NULL, "description" character varying NOT NULL, "location" json NOT NULL, CONSTRAINT "PK_333e143b4bbab6d0231e5e0d59a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "metadisc"`);
    }

}