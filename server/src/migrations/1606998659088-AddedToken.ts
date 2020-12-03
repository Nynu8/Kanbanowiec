import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedToken1606998659088 implements MigrationInterface {
  name = "AddedToken1606998659088";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
    await queryRunner.query(`DROP TABLE "token"`);
  }
}
