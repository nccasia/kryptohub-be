import {MigrationInterface, QueryRunner} from 'typeorm';

export class createUsers1651602940909 implements MigrationInterface {
    name = 'createUsers1651602940909';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NULL, "emailAddress" character varying NULL, "password" character varying NULL, "avatar" character varying NULL, "profileGithubLink" character varying NULL,"githubAddress" character varying NULL, "googleAddress" character varying NULL, "skills" character varying NULL, "teamId" integer, "status" character varying NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("emailAddress"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
