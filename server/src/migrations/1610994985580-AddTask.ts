import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTask1610994985580 implements MigrationInterface {
    name = 'AddTask1610994985580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "creatorId" uuid, "workerId" uuid, "columnId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ed550b4b10d0e5e1835e30566a" FOREIGN KEY ("workerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ed550b4b10d0e5e1835e30566a"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
