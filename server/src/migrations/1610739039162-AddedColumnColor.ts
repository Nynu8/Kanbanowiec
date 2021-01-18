import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedColumnColor1610739039162 implements MigrationInterface {
    name = 'AddedColumnColor1610739039162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "column_color_enum" AS ENUM('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white', 'brown')`);
        await queryRunner.query(`ALTER TABLE "column" ADD "color" "column_color_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" DROP COLUMN "color"`);
        await queryRunner.query(`DROP TYPE "column_color_enum"`);
    }

}
