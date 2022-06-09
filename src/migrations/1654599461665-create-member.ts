import {MigrationInterface, QueryRunner} from "typeorm";

export class createMember1654599461665 implements MigrationInterface {
    name = 'createMember1654599461665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."member_invitestatus_enum" AS ENUM('pending', 'rejected', 'acepted')`);
        await queryRunner.query(`CREATE TYPE "public"."member_role_enum" AS ENUM('leader', 'member')`);
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "emailAddress" character varying NOT NULL, "inviteStatus" "public"."member_invitestatus_enum" NOT NULL DEFAULT 'pending', "role" "public"."member_role_enum" NOT NULL DEFAULT 'member', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamId" integer, "userId" integer, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_01e5e486e315a72e243ff5737f9" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_08897b166dee565859b7fb2fcc8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_08897b166dee565859b7fb2fcc8"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_01e5e486e315a72e243ff5737f9"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TYPE "public"."member_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."member_invitestatus_enum"`);
    }

}
