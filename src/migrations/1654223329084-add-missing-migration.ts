import {MigrationInterface, QueryRunner} from "typeorm";

export class addMissingMigration1654223329084 implements MigrationInterface {
    name = 'addMissingMigration1654223329084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "birthday" date NOT NULL, "website" character varying NOT NULL, "occupation" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "githubAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarPath" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamSize" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "timeZone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "organization" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "workingTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "hour" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "week" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatarUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "slogan" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "founded" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "linkWebsite" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "updateAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "projectSize" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ALTER COLUMN "skillDistributionName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ALTER COLUMN "skillDistributionValue" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_skills_skill" ADD CONSTRAINT "FK_88f5b9015e2192075697cb0d442" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_skills_skill" ADD CONSTRAINT "FK_2830e62240ec8b69d3b9a767497" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_2830e62240ec8b69d3b9a767497"`);
        await queryRunner.query(`ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_88f5b9015e2192075697cb0d442"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ALTER COLUMN "skillDistributionValue" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill_distribution" ALTER COLUMN "skillDistributionName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "projectSize" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "updateAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "linkWebsite" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "founded" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "slogan" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatarUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "week" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "hour" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "workingTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "organization" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "timeZone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamSize" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "teamName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarPath" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "googleAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "githubAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "emailAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
