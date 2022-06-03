import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSkillDistributionTeam1654232308496 implements MigrationInterface {
    name = 'updateSkillDistributionTeam1654232308496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_distribution" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ADD CONSTRAINT "FK_d1365eaf0d5fbd1eca601d9ce41" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_distribution" DROP CONSTRAINT "FK_d1365eaf0d5fbd1eca601d9ce41"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" DROP COLUMN "teamId"`);
    }

}
