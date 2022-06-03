import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1653879616795 implements MigrationInterface {
    name = 'createUsers1653879616795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('username', 'google', 'github')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "provider" "public"."user_provider_enum", "username" character varying NULL, "emailAddress" character varying NULL, "password" character varying NULL, "githubAddress" character varying NULL, "googleAddress" character varying NULL, "avatarPath" character varying NULL, "status" character varying NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
    }

}
