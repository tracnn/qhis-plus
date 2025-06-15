import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749950164040 implements MigrationInterface {
    name = 'Update1749950164040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "APPOINTMENT_SLOTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "SLOT_DATE" varchar2(10) NOT NULL, "SLOT_TIME" varchar2(255) NOT NULL, "CLINIC_ID" number NOT NULL, "DOCTOR_ID" number NOT NULL, "SERVICE_CODE" varchar2(255), "SERVICE_PRICE" number, "MAX_PATIENT" number, "SLOT_TYPE" varchar2(255), "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_9cb7e74d2534715f12ac80efb69" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b5bab1f58e107466bc7db0986" ON "APPOINTMENT_SLOTS" ("SLOT_DATE")`);
        await queryRunner.query(`CREATE INDEX "IDX_8b25d3a6acbd24041d103592ac" ON "APPOINTMENT_SLOTS" ("SLOT_TIME")`);
        await queryRunner.query(`CREATE INDEX "IDX_6158519ceaa799f70dd625f780" ON "APPOINTMENT_SLOTS" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f" ON "APPOINTMENT_SLOTS" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_fff6765398d6046b608531a55f" ON "APPOINTMENT_SLOTS" ("SERVICE_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_99599685fd522b98bc5367073a" ON "APPOINTMENT_SLOTS" ("SLOT_TYPE")`);
        await queryRunner.query(`CREATE TABLE "CLINIC_SPECIALTIES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "CLINIC_ID" number NOT NULL, "SPECIALTY_ID" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_9c12925976fb9b9059f7553c9c8" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a513a8d3cf286f755ebc2a1224" ON "CLINIC_SPECIALTIES" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_02f300afb32af7ce26da57c81e" ON "CLINIC_SPECIALTIES" ("SPECIALTY_ID")`);
        await queryRunner.query(`CREATE TABLE "DOCTOR_TITLES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "DOCTOR_ID" number NOT NULL, "TITLE_ID" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_df4659204129d864c96ae70103b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_547ca6bcf638dfbfb409dd9ff9" ON "DOCTOR_TITLES" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_2e888ba5d994c265ebb1d53a92" ON "DOCTOR_TITLES" ("TITLE_ID")`);
        await queryRunner.query(`CREATE TABLE "APPOINTMENTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "APPOINTMENT_SLOT_ID" varchar2(255) NOT NULL, "PATIENT_ID" varchar2(255) NOT NULL, "APPOINTMENT_STATUS" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_7ea218946c944378ae254792911" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b6876ab333cf3a5a206a3efe4" ON "APPOINTMENTS" ("APPOINTMENT_SLOT_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_d3edb54ccf3d04ae2633c694ab" ON "APPOINTMENTS" ("PATIENT_ID")`);
        await queryRunner.query(`CREATE TABLE "SPECIALTIES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "SPECIALTY_CODE" varchar2(255) NOT NULL, "SPECIALTY_NAME" varchar2(255) NOT NULL, "ORDER" number, "SPECIALTY_DESCRIPTION" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_17e5b121fe09203435470e13c3c" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_45994e165148472ea6ec1051f0" ON "SPECIALTIES" ("SPECIALTY_CODE")`);
        await queryRunner.query(`CREATE TABLE "TITLES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "TITLE_CODE" varchar2(255) NOT NULL, "TITLE_NAME" varchar2(255) NOT NULL, "ORDER" number, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_e01b3c764040c32f16189fae5fe" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ea48d2eb4a7b3d374cbcbe4c69" ON "TITLES" ("TITLE_CODE")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_ea48d2eb4a7b3d374cbcbe4c69"`);
        await queryRunner.query(`DROP TABLE "TITLES"`);
        await queryRunner.query(`DROP INDEX "IDX_45994e165148472ea6ec1051f0"`);
        await queryRunner.query(`DROP TABLE "SPECIALTIES"`);
        await queryRunner.query(`DROP INDEX "IDX_d3edb54ccf3d04ae2633c694ab"`);
        await queryRunner.query(`DROP INDEX "IDX_8b6876ab333cf3a5a206a3efe4"`);
        await queryRunner.query(`DROP TABLE "APPOINTMENTS"`);
        await queryRunner.query(`DROP INDEX "IDX_2e888ba5d994c265ebb1d53a92"`);
        await queryRunner.query(`DROP INDEX "IDX_547ca6bcf638dfbfb409dd9ff9"`);
        await queryRunner.query(`DROP TABLE "DOCTOR_TITLES"`);
        await queryRunner.query(`DROP INDEX "IDX_02f300afb32af7ce26da57c81e"`);
        await queryRunner.query(`DROP INDEX "IDX_a513a8d3cf286f755ebc2a1224"`);
        await queryRunner.query(`DROP TABLE "CLINIC_SPECIALTIES"`);
        await queryRunner.query(`DROP INDEX "IDX_99599685fd522b98bc5367073a"`);
        await queryRunner.query(`DROP INDEX "IDX_fff6765398d6046b608531a55f"`);
        await queryRunner.query(`DROP INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f"`);
        await queryRunner.query(`DROP INDEX "IDX_6158519ceaa799f70dd625f780"`);
        await queryRunner.query(`DROP INDEX "IDX_8b25d3a6acbd24041d103592ac"`);
        await queryRunner.query(`DROP INDEX "IDX_2b5bab1f58e107466bc7db0986"`);
        await queryRunner.query(`DROP TABLE "APPOINTMENT_SLOTS"`);
    }

}
