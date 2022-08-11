import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFieldContactJoinTeam1660112689831 implements MigrationInterface {
    name = 'updateFieldContactJoinTeam1660112689831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join_team" DROP CONSTRAINT "FK_9de1c86025574826754d387a754"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join_team" ADD CONSTRAINT "FK_9de1c86025574826754d387a754" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
