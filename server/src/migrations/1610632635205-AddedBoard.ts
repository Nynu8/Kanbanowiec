import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedBoard1610632635205 implements MigrationInterface {
    name = 'AddedBoard1610632635205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
