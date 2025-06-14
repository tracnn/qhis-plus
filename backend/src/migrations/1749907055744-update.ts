import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749907055744 implements MigrationInterface {
    name = 'Update1749907055744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DOCTOR_TITLES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "DOCTOR_ID" number NOT NULL, "TITLE_ID" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_df4659204129d864c96ae70103b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_547ca6bcf638dfbfb409dd9ff9" ON "DOCTOR_TITLES" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_2e888ba5d994c265ebb1d53a92" ON "DOCTOR_TITLES" ("TITLE_ID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2e888ba5d994c265ebb1d53a92"`);
        await queryRunner.query(`DROP INDEX "IDX_547ca6bcf638dfbfb409dd9ff9"`);
        await queryRunner.query(`DROP TABLE "DOCTOR_TITLES"`);
    }

}
