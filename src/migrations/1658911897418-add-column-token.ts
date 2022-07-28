import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnToken1658911897418 implements MigrationInterface {
    name = 'addColumnToken1658911897418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
