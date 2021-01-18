import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFieldsToNonNullable1611004411601 implements MigrationInterface {
    name = 'ChangeFieldsToNonNullable1611004411601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" DROP CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4"`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "boardId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_597ece31cb66da207b055f588ba"`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "boardId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "creatorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "columnId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "column" ADD CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_597ece31cb66da207b055f588ba" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_597ece31cb66da207b055f588ba"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"`);
        await queryRunner.query(`ALTER TABLE "column" DROP CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "columnId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "creatorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_94fe6b3a5aec5f85427df4f8cd7" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "boardId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_597ece31cb66da207b055f588ba" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "boardId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "column" ADD CONSTRAINT "FK_cf15a522eb00160987b6fcf91e4" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
