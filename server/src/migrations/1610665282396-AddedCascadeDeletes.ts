import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCascadeDeletes1610665282396 implements MigrationInterface {
    name = 'AddedCascadeDeletes1610665282396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_597ece31cb66da207b055f588ba"`);
        await queryRunner.query(`ALTER TYPE "public"."permission_type_enum" RENAME TO "permission_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "permission_type_enum" AS ENUM('Owner', 'Administrator', 'User', 'Viewer')`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "type" TYPE "permission_type_enum" USING "type"::"text"::"permission_type_enum"`);
        await queryRunner.query(`DROP TYPE "permission_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_597ece31cb66da207b055f588ba" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_597ece31cb66da207b055f588ba"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"`);
        await queryRunner.query(`CREATE TYPE "permission_type_enum_old" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "permission" ALTER COLUMN "type" TYPE "permission_type_enum_old" USING "type"::"text"::"permission_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "permission_type_enum"`);
        await queryRunner.query(`ALTER TYPE "permission_type_enum_old" RENAME TO  "permission_type_enum"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_597ece31cb66da207b055f588ba" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
