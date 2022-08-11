import {MigrationInterface, QueryRunner} from "typeorm";

export class createContactJoinTeam1660103854212 implements MigrationInterface {
    name = 'createContactJoinTeam1660103854212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "join_team" ("id" SERIAL NOT NULL, "emailAddress" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "isApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teamId" integer, "userId" integer, CONSTRAINT "PK_151ef4d1fc9d3bcc4f520b59158" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "join_team" ADD CONSTRAINT "FK_9cfcbe4b8f81452acf920156828" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_team" ADD CONSTRAINT "FK_9de1c86025574826754d387a754" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join_team" DROP CONSTRAINT "FK_9de1c86025574826754d387a754"`);
        await queryRunner.query(`ALTER TABLE "join_team" DROP CONSTRAINT "FK_9cfcbe4b8f81452acf920156828"`);
        await queryRunner.query(`DROP TABLE "join_team"`);
    }

}
