import {MigrationInterface, QueryRunner} from "typeorm";

export class createAwards1655094756832 implements MigrationInterface {
    name = 'createAwards1655094756832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "awards" ("id" SERIAL NOT NULL, "awardsTitle" character varying, "awardsWebsite" character varying, "teamId" integer, CONSTRAINT "PK_bc3f6adc548ff46c76c03e06377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "awards" ADD CONSTRAINT "FK_e424cc27045c24dab9029aa2d3b" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "awards" DROP CONSTRAINT "FK_e424cc27045c24dab9029aa2d3b"`);
        await queryRunner.query(`DROP TABLE "awards"`);
    }

}
