import {MigrationInterface, QueryRunner} from "typeorm";

export class updateColumnCreateUser1654497748866 implements MigrationInterface {
    name = 'updateColumnCreateUser1654497748866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileLink"`);
    }

}
