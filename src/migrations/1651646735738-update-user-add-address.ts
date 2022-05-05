import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserAddAddress1651646735738 implements MigrationInterface {
    name = 'updateUserAddAddress1651646735738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "walletAddress" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walletAddress"`);
    }

}
