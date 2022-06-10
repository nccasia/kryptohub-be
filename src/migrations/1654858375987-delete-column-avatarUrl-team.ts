import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteColumnAvatarUrlTeam1654858375987 implements MigrationInterface {
    name = 'deleteColumnAvatarUrlTeam1654858375987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "team" ADD "avatar" character varying`);
    }

}
