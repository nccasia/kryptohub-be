import {MigrationInterface, QueryRunner} from "typeorm";

export class createTeams1653879624548 implements MigrationInterface {
    name = 'createTeams1653879624548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "teamName" character varying NOT NULL, "teamSize" character varying NOT NULL, "timeZone" character varying NOT NULL, "organization" character varying NOT NULL, "skill" text array NOT NULL, "workingTime" character varying NOT NULL, "hour" character varying NOT NULL, "week" character varying NOT NULL, "description" character varying NOT NULL, "avatar" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
