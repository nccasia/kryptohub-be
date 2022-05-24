import {MigrationInterface, QueryRunner} from 'typeorm';

export class skill1653290381500 implements MigrationInterface {
    name = 'skill1653290381500';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "skill" ("skillId" SERIAL NOT NULL, "skillName" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("skillId"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "skill"`);
    }
}

