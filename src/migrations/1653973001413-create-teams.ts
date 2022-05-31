import {MigrationInterface, QueryRunner} from 'typeorm';

export class createTeams1653973001413 implements MigrationInterface {
    name = 'createTeams1653973001413';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "team" ("id" SERIAL NOT NULL, "teamName" character varying NULL, "teamSize" character varying NULL, "timeZone" character varying NULL, "organization" character varying NULL, "workingTime" character varying NULL, "hour" character varying NULL, "week" character varying NULL, "description" character varying NULL, "avatar" character varying NULL, "avatarUrl" character varying NULL, "founded" character varying NULL, "linkWebsite" character varying NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "projectSize" character varying NULL, "status" boolean NULL DEFAULT false, "location" character varying NULL,CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team"`);
    }
}

