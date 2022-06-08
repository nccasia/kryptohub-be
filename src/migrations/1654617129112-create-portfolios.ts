import {MigrationInterface, QueryRunner} from "typeorm";

export class createPortfolios1654617129112 implements MigrationInterface {
    name = 'createPortfolios1654617129112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."portfolio_privacy_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "companyName" character varying, "imageUrl" character varying, "videoLink" character varying, "content" character varying, "clientWebsite" character varying, "title" character varying, "category" character varying, "estimate" character varying, "startDate" character varying, "endDate" character varying, "description" character varying, "privacy" "public"."portfolio_privacy_enum", "teamId" integer, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_007b6a4ef9030a0822e832f2871" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_007b6a4ef9030a0822e832f2871"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TYPE "public"."portfolio_privacy_enum"`);
    }

}
