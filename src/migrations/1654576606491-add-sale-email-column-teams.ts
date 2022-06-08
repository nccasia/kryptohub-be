import {MigrationInterface, QueryRunner} from "typeorm";

export class addSaleEmailColumnTeams1654576606491 implements MigrationInterface {
    name = 'addSaleEmailColumnTeams1654576606491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "week"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "adminEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "saleEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "team" ADD "saleEmail" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "saleEmail"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "saleEmail"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "adminEmail"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "team" ADD "week" character varying`);
        await queryRunner.query(`ALTER TABLE "team" ADD "hour" character varying`);
    }

}
