import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNotNullColumn1654225986604 implements MigrationInterface {
    name = 'updateNotNullColumn1654225986604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "githubAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarPath" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamSize" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "timeZone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "organization" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "workingTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "hour" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "week" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatarUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "slogan" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "founded" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "linkWebsite" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "projectSize" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "location" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "projectSize" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "linkWebsite" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "founded" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "slogan" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatarUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "week" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "hour" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "workingTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "organization" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "timeZone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamSize" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarPath" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "githubAddress" SET NOT NULL`);
    }

}
