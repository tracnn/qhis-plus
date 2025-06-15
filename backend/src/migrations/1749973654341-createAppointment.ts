import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointment1749973654341 implements MigrationInterface {
    name = 'CreateAppointment1749973654341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "APPOINTMENTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "APPOINTMENT_CODE" varchar2(255) NOT NULL, "APPOINTMENT_SLOT_ID" varchar2(255) NOT NULL, "PATIENT_ID" varchar2(255) NOT NULL, "APPOINTMENT_STATUS" varchar2(255) DEFAULT 'PENDING' NOT NULL, "APPOINTMENT_NOTE" varchar2(255) NOT NULL, "SOURCE_TYPE" varchar2(255) DEFAULT 'APP_MOBILE' NOT NULL, "CONFIRM_BY" varchar2(255) NOT NULL, "USER_ID" varchar2(255) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "UQ_27dde68361bdd6431af262bb431" UNIQUE ("APPOINTMENT_CODE"), CONSTRAINT "PK_7ea218946c944378ae254792911" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b6876ab333cf3a5a206a3efe4" ON "APPOINTMENTS" ("APPOINTMENT_SLOT_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_d3edb54ccf3d04ae2633c694ab" ON "APPOINTMENTS" ("PATIENT_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_f13ebc722dc9e605c488024cdc" ON "APPOINTMENTS" ("CONFIRM_BY")`);
        await queryRunner.query(`CREATE INDEX "IDX_12bd869745ca736a1bee78bda3" ON "APPOINTMENTS" ("USER_ID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_12bd869745ca736a1bee78bda3"`);
        await queryRunner.query(`DROP INDEX "IDX_f13ebc722dc9e605c488024cdc"`);
        await queryRunner.query(`DROP INDEX "IDX_d3edb54ccf3d04ae2633c694ab"`);
        await queryRunner.query(`DROP INDEX "IDX_8b6876ab333cf3a5a206a3efe4"`);
        await queryRunner.query(`DROP TABLE "APPOINTMENTS"`);
    }

}
