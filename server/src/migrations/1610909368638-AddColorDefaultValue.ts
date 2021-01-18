import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColorDefaultValue1610909368638 implements MigrationInterface {
    name = 'AddColorDefaultValue1610909368638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" SET DEFAULT 'black'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" ALTER COLUMN "color" DROP DEFAULT`);
    }

}
