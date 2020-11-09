import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserFields1604700463120 implements MigrationInterface {
    name = 'AddedUserFields1604700463120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "surname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

}
