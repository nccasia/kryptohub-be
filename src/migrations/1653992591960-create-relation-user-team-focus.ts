import {MigrationInterface, QueryRunner} from 'typeorm';

export class createRelationUserTeamFocus1653992591960
    implements MigrationInterface
{
    name = 'createRelationUserTeamFocus1653992591960';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "team_skills_skill" ("teamId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_a8d9f50b104d6a6bf17aca9d5e9" PRIMARY KEY ("teamId", "skillId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_88f5b9015e2192075697cb0d44" ON "team_skills_skill" ("teamId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_2830e62240ec8b69d3b9a76749" ON "team_skills_skill" ("skillId") `,
        );
        await queryRunner.query(
            `CREATE TABLE "team_focus_focus" ("teamId" integer NOT NULL, "focusId" integer NOT NULL, CONSTRAINT "PK_f9e359b577ed31c120a07f4a106" PRIMARY KEY ("teamId", "focusId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c25e4ba688156005a16cc2a9d6" ON "team_focus_focus" ("teamId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_5b34bcda7997619d72966b7d74" ON "team_focus_focus" ("focusId") `,
        );

        await queryRunner.query(
            `ALTER TABLE "team" ADD COLUMN "userId" integer NOT NULL`,
        );

        await queryRunner.query(
            `ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" ADD CONSTRAINT "FK_88f5b9015e2192075697cb0d442" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" ADD CONSTRAINT "FK_2830e62240ec8b69d3b9a767497" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_focus_focus" ADD CONSTRAINT "FK_c25e4ba688156005a16cc2a9d6d" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_focus_focus" ADD CONSTRAINT "FK_5b34bcda7997619d72966b7d74e" FOREIGN KEY ("focusId") REFERENCES "focus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "team_focus_focus" DROP CONSTRAINT "FK_5b34bcda7997619d72966b7d74e"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_focus_focus" DROP CONSTRAINT "FK_c25e4ba688156005a16cc2a9d6d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_2830e62240ec8b69d3b9a767497"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team_skills_skill" DROP CONSTRAINT "FK_88f5b9015e2192075697cb0d442"`,
        );
        await queryRunner.query(
            `ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_5b34bcda7997619d72966b7d74"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c25e4ba688156005a16cc2a9d6"`,
        );
        await queryRunner.query(`DROP TABLE "team_focus_focus"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_2830e62240ec8b69d3b9a76749"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_88f5b9015e2192075697cb0d44"`,
        );
        await queryRunner.query(`DROP TABLE "team_skills_skill"`);
    }
}

