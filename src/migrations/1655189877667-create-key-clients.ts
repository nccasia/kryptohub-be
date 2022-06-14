import {MigrationInterface, QueryRunner} from "typeorm";

export class createKeyClients1655189877667 implements MigrationInterface {
    name = 'createKeyClients1655189877667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "key_client" ("id" SERIAL NOT NULL, "keyName" text, "teamId" integer, CONSTRAINT "PK_2bfcf451533ba7ae16bba5a18b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer`);
        await queryRunner.query(`ALTER TABLE "key_client" ADD CONSTRAINT "FK_fef8c4eac77056107fd28b506da" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "key_client" DROP CONSTRAINT "FK_fef8c4eac77056107fd28b506da"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`DROP TABLE "key_client"`);
    }

}
