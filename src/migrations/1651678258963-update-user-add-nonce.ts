import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserAddNonce1651678258963 implements MigrationInterface {
    name = 'updateUserAddNonce1651678258963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nonce" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nonce"`);
    }

}
