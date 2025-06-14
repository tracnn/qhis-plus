import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749916365877 implements MigrationInterface {
    name = 'Update1749916365877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "APPOINTMENT_SLOTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "SLOT_DATE" timestamp NOT NULL, "SLOT_TIME" varchar2(255) NOT NULL, "CLINIC_ID" number NOT NULL, "DOCTOR_ID" number NOT NULL, "SERVICE_CODE" varchar2(255), "SERVICE_PRICE" number, "MAX_PATIENT" number, "SLOT_TYPE" varchar2(255), "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_9cb7e74d2534715f12ac80efb69" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b5bab1f58e107466bc7db0986" ON "APPOINTMENT_SLOTS" ("SLOT_DATE")`);
        await queryRunner.query(`CREATE INDEX "IDX_8b25d3a6acbd24041d103592ac" ON "APPOINTMENT_SLOTS" ("SLOT_TIME")`);
        await queryRunner.query(`CREATE INDEX "IDX_6158519ceaa799f70dd625f780" ON "APPOINTMENT_SLOTS" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f" ON "APPOINTMENT_SLOTS" ("DOCTOR_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_fff6765398d6046b608531a55f" ON "APPOINTMENT_SLOTS" ("SERVICE_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_99599685fd522b98bc5367073a" ON "APPOINTMENT_SLOTS" ("SLOT_TYPE")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_99599685fd522b98bc5367073a"`);
        await queryRunner.query(`DROP INDEX "IDX_fff6765398d6046b608531a55f"`);
        await queryRunner.query(`DROP INDEX "IDX_fb1255b8ca9abcdfe8f3b3fe7f"`);
        await queryRunner.query(`DROP INDEX "IDX_6158519ceaa799f70dd625f780"`);
        await queryRunner.query(`DROP INDEX "IDX_8b25d3a6acbd24041d103592ac"`);
        await queryRunner.query(`DROP INDEX "IDX_2b5bab1f58e107466bc7db0986"`);
        await queryRunner.query(`DROP TABLE "APPOINTMENT_SLOTS"`);
    }

}
