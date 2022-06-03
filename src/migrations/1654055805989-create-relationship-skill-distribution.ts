import {MigrationInterface, QueryRunner} from 'typeorm';

export class createRelationshipSkillDistribution1654055805989
    implements MigrationInterface
{
    name = 'createRelationshipSkillDistribution1654055805989';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "team_skill_distribution_skill_distribution" ("teamId" integer NOT NULL, "skillDistributionId" integer NOT NULL, CONSTRAINT "PK_f9608521c1fa910cadff1534def" PRIMARY KEY ("teamId", "skillDistributionId"))`,
        );

        await queryRunner.query(
            `CREATE TABLE "team_skills_skill" ("teamId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_a8d9f50b104d6a6bf17aca9d5e9" PRIMARY KEY ("teamId", "skillId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_88f5b9015e2192075697cb0d44" ON "team_skills_skill" ("teamId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_2830e62240ec8b69d3b9a76749" ON "team_skills_skill" ("skillId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_b8995858880ea0adcf38e86750" ON "team_skill_distribution_skill_distribution" ("teamId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_32b8c46cd38907cd6ece020668" ON "team_skill_distribution_skill_distribution" ("skillDistributionId") `,
        );

        await queryRunner.query(
            `ALTER TABLE "team" ADD COLUMN "userId" integer NOT NULL`,
        );

        // await queryRunner.query(
        //     `ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`,
        // );

        await queryRunner.query(
            `ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `ALTER TABLE "team_skill_distribution_skill_distribution" ADD CONSTRAINT "FK_b8995858880ea0adcf38e867508" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skill_distribution_skill_distribution" ADD CONSTRAINT "FK_32b8c46cd38907cd6ece020668d" FOREIGN KEY ("skillDistributionId") REFERENCES "skill_distribution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_2830e62240ec8b69d3b9a767497"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_88f5b9015e2192075697cb0d442"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skill_distribution_skill_distribution" DROP CONSTRAINT "FK_32b8c46cd38907cd6ece020668d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skill_distribution_skill_distribution" DROP CONSTRAINT "FK_b8995858880ea0adcf38e867508"`,
        );

        await queryRunner.query(
            `ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team" ALTER COLUMN "userId" SET NOT NULL`,
        );

        await queryRunner.query(
            `ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );

        await queryRunner.query(
            `DROP INDEX "public"."IDX_32b8c46cd38907cd6ece020668"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_b8995858880ea0adcf38e86750"`,
        );
        await queryRunner.query(
            `DROP TABLE "team_skill_distribution_skill_distribution"`,
        );
    }
}
