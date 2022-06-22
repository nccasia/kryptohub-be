import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteMember1655864093820 implements MigrationInterface {
    name = 'addDeleteMember1655864093820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "deletedAt"`);
    }

}
