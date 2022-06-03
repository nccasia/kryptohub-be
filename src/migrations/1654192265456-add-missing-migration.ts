import {MigrationInterface, QueryRunner} from "typeorm";

export class addMissingMigration1654192265456 implements MigrationInterface {
    name = 'addMissingMigration1654192265456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('username', 'google', 'github')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" "public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nonce" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "walletAddress" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "walletAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nonce" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying NOT NULL`);
    }

}
