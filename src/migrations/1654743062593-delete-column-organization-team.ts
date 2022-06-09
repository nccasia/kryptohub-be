import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteColumnOrganizationTeam1654743062593 implements MigrationInterface {
    name = 'deleteColumnOrganizationTeam1654743062593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "organization"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "organization" character varying`);
    }

}
