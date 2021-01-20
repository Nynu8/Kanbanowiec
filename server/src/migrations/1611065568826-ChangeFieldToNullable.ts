import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFieldToNullable1611065568826 implements MigrationInterface {
    name = 'ChangeFieldToNullable1611065568826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "description" SET NOT NULL`);
    }

}
