import {MigrationInterface, QueryRunner} from 'typeorm';

export class createFocus1653979530366 implements MigrationInterface {
    name = 'createFocus1653979530366';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "focus" ("id" SERIAL NOT NULL, "focusName" character varying NULL, "focusValue" jsonb NULL, CONSTRAINT "PK_c53b97837bdb1f2f8c14c6ea1e0" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "focus"`);
    }
}

