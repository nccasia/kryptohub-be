import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserSortList1655346594481 implements MigrationInterface {
    name = 'addUserSortList1655346594481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "shortList" integer array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shortList"`);
    }

}
