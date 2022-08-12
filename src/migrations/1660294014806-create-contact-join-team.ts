import {MigrationInterface, QueryRunner} from "typeorm";

export class createContactJoinTeam1660294014806 implements MigrationInterface {
    name = 'createContactJoinTeam1660294014806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "join_team" ("id" SERIAL NOT NULL, "teamId" integer, "userId" integer, "emailAddress" character varying NOT NULL, "username" character varying, "verified" boolean NOT NULL DEFAULT false, "isApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_151ef4d1fc9d3bcc4f520b59158" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "join_team"`);
    }

}
