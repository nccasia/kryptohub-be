import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSkillDistributionValueColumn1654239801406 implements MigrationInterface {
    name = 'updateSkillDistributionValueColumn1654239801406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_distribution" DROP COLUMN "skillDistributionValue"`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ADD "skillDistributionValue" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_distribution" DROP COLUMN "skillDistributionValue"`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ADD "skillDistributionValue" jsonb NOT NULL`);
    }

}
