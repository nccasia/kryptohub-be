import {MigrationInterface, QueryRunner} from 'typeorm';

export class createSkillDistribution1654055190322
    implements MigrationInterface
{
    name = 'createSkillDistribution1654055190322';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "skill_distribution" ("id" SERIAL NOT NULL, "skillDistributionName" character varying NOT NULL, "skillDistributionValue" jsonb NOT NULL, CONSTRAINT "PK_3a6506baeeeb4869f224a8ac091" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "skill_distribution"`);
    }
}

