import {MigrationInterface, QueryRunner} from "typeorm";

export class FixEnum1611167630692 implements MigrationInterface {
    name = 'FixEnum1611167630692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."column_color_enum" RENAME TO "column_color_enum_old"`);
        await queryRunner.query(`CREATE TYPE "column_color_enum" AS ENUM('Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White', 'Wrown')`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" TYPE "column_color_enum" USING "color"::"text"::"column_color_enum"`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" SET DEFAULT 'Black'`);
        await queryRunner.query(`DROP TYPE "column_color_enum_old"`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" SET DEFAULT 'Black'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" SET DEFAULT 'black'`);
        await queryRunner.query(`CREATE TYPE "column_color_enum_old" AS ENUM('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white', 'brown')`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" TYPE "column_color_enum_old" USING "color"::"text"::"column_color_enum_old"`);
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" SET DEFAULT 'Black'`);
        await queryRunner.query(`DROP TYPE "column_color_enum"`);
        await queryRunner.query(`ALTER TYPE "column_color_enum_old" RENAME TO  "column_color_enum"`);
    }

}
