import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumn1610662900371 implements MigrationInterface {
    name = 'AddColumn1610662900371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" integer NOT NULL, "name" character varying NOT NULL, "boardId" uuid, CONSTRAINT "PK_cee3c7ee3135537fb8f5df4422b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "column" ADD CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" DROP CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4"`);
        await queryRunner.query(`DROP TABLE "column"`);
    }

}
