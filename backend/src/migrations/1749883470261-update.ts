import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749883470261 implements MigrationInterface {
    name = 'Update1749883470261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "APPOINTMENT_SLOTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "SLOT_DATE" timestamp NOT NULL, "START_TIME" varchar2(255) NOT NULL, "END_TIME" varchar2(255) NOT NULL, "CLINIC_ID" varchar2(255) NOT NULL, "CLINIC_CODE" varchar2(255) NOT NULL, "DOCTOR_ID" varchar2(255) NOT NULL, "DOCTOR_CODE" varchar2(255) NOT NULL, "SERVICE_CODE" varchar2(255) NOT NULL, "SERVICE_PRICE" number NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_9cb7e74d2534715f12ac80efb69" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b5bab1f58e107466bc7db0986" ON "APPOINTMENT_SLOTS" ("SLOT_DATE")`);
        await queryRunner.query(`CREATE INDEX "IDX_31ca13fbe9c50465531c072d5c" ON "APPOINTMENT_SLOTS" ("START_TIME")`);
        await queryRunner.query(`CREATE INDEX "IDX_5542b50131d8164313c8fefab7" ON "APPOINTMENT_SLOTS" ("END_TIME")`);
        await queryRunner.query(`CREATE INDEX "IDX_6158519ceaa799f70dd625f780" ON "APPOINTMENT_SLOTS" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_12d8498d5a0572bdd977dbdfa9" ON "APPOINTMENT_SLOTS" ("CLINIC_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f" ON "APPOINTMENT_SLOTS" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_063126d48c70f108c4eac99a31" ON "APPOINTMENT_SLOTS" ("DOCTOR_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_fff6765398d6046b608531a55f" ON "APPOINTMENT_SLOTS" ("SERVICE_CODE")`);
        await queryRunner.query(`CREATE TABLE "CLINIC_SPECIALTIES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "CLINIC_ID" varchar2(255) NOT NULL, "CLINIC_CODE" varchar2(255) NOT NULL, "SPECIALTY_ID" varchar2(255) NOT NULL, "SPECIALTY_CODE" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_9c12925976fb9b9059f7553c9c8" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a513a8d3cf286f755ebc2a1224" ON "CLINIC_SPECIALTIES" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_3e21f470c6c2a163cd6532d683" ON "CLINIC_SPECIALTIES" ("CLINIC_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_02f300afb32af7ce26da57c81e" ON "CLINIC_SPECIALTIES" ("SPECIALTY_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_d2590aa38e1748047aa3ea045c" ON "CLINIC_SPECIALTIES" ("SPECIALTY_CODE")`);
        await queryRunner.query(`CREATE TABLE "DOCTOR_TITLES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "DOCTOR_ID" varchar2(255) NOT NULL, "DOCTOR_CODE" varchar2(255) NOT NULL, "TITLE_ID" varchar2(255) NOT NULL, "TITLE_CODE" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_df4659204129d864c96ae70103b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_547ca6bcf638dfbfb409dd9ff9" ON "DOCTOR_TITLES" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_1c24b41a678fbac249b60292e2" ON "DOCTOR_TITLES" ("DOCTOR_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_2e888ba5d994c265ebb1d53a92" ON "DOCTOR_TITLES" ("TITLE_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_f0013798ac7cc050c40cfdadeb" ON "DOCTOR_TITLES" ("TITLE_CODE")`);
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
        await queryRunner.query(`DROP INDEX "IDX_f0013798ac7cc050c40cfdadeb"`);
        await queryRunner.query(`DROP INDEX "IDX_2e888ba5d994c265ebb1d53a92"`);
        await queryRunner.query(`DROP INDEX "IDX_1c24b41a678fbac249b60292e2"`);
        await queryRunner.query(`DROP INDEX "IDX_547ca6bcf638dfbfb409dd9ff9"`);
        await queryRunner.query(`DROP TABLE "DOCTOR_TITLES"`);
        await queryRunner.query(`DROP INDEX "IDX_d2590aa38e1748047aa3ea045c"`);
        await queryRunner.query(`DROP INDEX "IDX_02f300afb32af7ce26da57c81e"`);
        await queryRunner.query(`DROP INDEX "IDX_3e21f470c6c2a163cd6532d683"`);
        await queryRunner.query(`DROP INDEX "IDX_a513a8d3cf286f755ebc2a1224"`);
        await queryRunner.query(`DROP TABLE "CLINIC_SPECIALTIES"`);
        await queryRunner.query(`DROP INDEX "IDX_fff6765398d6046b608531a55f"`);
        await queryRunner.query(`DROP INDEX "IDX_063126d48c70f108c4eac99a31"`);
        await queryRunner.query(`DROP INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f"`);
        await queryRunner.query(`DROP INDEX "IDX_12d8498d5a0572bdd977dbdfa9"`);
        await queryRunner.query(`DROP INDEX "IDX_6158519ceaa799f70dd625f780"`);
        await queryRunner.query(`DROP INDEX "IDX_5542b50131d8164313c8fefab7"`);
        await queryRunner.query(`DROP INDEX "IDX_31ca13fbe9c50465531c072d5c"`);
        await queryRunner.query(`DROP INDEX "IDX_2b5bab1f58e107466bc7db0986"`);
        await queryRunner.query(`DROP TABLE "APPOINTMENT_SLOTS"`);
    }

}
