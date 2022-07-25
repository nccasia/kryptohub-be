import {MigrationInterface, QueryRunner} from "typeorm";

export class createServiceLine1658720344734 implements MigrationInterface {
    name = 'createServiceLine1658720344734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_line" ("id" SERIAL NOT NULL, "name" character varying, "value" text, CONSTRAINT "PK_33963e88ff5a2bf335e5086c681" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service_line"`);
    }

}
