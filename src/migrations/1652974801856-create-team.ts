import {MigrationInterface, QueryRunner} from 'typeorm';

export class createTeam1652974801856 implements MigrationInterface {
    name = 'createTeam1652974801856';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "team" ("id" SERIAL NOT NULL, "teamName" character varying NULL, "teamSize" character varying NULL, "timeZone" character varying NULL, "organization" character varying NULL, "skill" character varying NULL, "workingTime" character varying NULL, "hour" character varying NULL, "week" character varying NULL,"description" character varying NULL, "avatar" character varying NULL, "userId" integer, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "team"`);
    }
}

