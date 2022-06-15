import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteAtColumnTeam1655282886519 implements MigrationInterface {
    name = 'addDeleteAtColumnTeam1655282886519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TYPE "public"."member_invitestatus_enum" RENAME TO "member_invitestatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."member_invitestatus_enum" AS ENUM('pending', 'rejected', 'accepted')`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" TYPE "public"."member_invitestatus_enum" USING "inviteStatus"::"text"::"public"."member_invitestatus_enum"`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."member_invitestatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."member_invitestatus_enum_old" AS ENUM('pending', 'rejected', 'acepted')`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" TYPE "public"."member_invitestatus_enum_old" USING "inviteStatus"::"text"::"public"."member_invitestatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "inviteStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."member_invitestatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."member_invitestatus_enum_old" RENAME TO "member_invitestatus_enum"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "deletedAt"`);
    }

}
