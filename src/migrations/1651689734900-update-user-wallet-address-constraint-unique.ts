import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserWalletAddressConstraintUnique1651689734900 implements MigrationInterface {
    name = 'updateUserWalletAddressConstraintUnique1651689734900';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e23" UNIQUE ("walletAddress")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e23"`);
    }

}
