import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIndexPhoneNumber1749776600485 implements MigrationInterface {
    name = 'UpdateIndexPhoneNumber1749776600485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_PHONE_NUMBER" ON "USERS" ("PHONE_NUMBER")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_USERS_PHONE_NUMBER"`);
    }

}
