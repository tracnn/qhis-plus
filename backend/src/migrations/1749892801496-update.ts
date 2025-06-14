import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749892801496 implements MigrationInterface {
    name = 'Update1749892801496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_3e21f470c6c2a163cd6532d683"`);
        await queryRunner.query(`DROP INDEX "IDX_d2590aa38e1748047aa3ea045c"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" DROP COLUMN "CLINIC_CODE"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" DROP COLUMN "SPECIALTY_CODE"`);
        await queryRunner.query(`DROP INDEX "IDX_a513a8d3cf286f755ebc2a1224"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" DROP COLUMN "CLINIC_ID"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" ADD "CLINIC_ID" number NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_a513a8d3cf286f755ebc2a1224" ON "CLINIC_SPECIALTIES" ("CLINIC_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_a513a8d3cf286f755ebc2a1224" ON "CLINIC_SPECIALTIES" ("CLINIC_ID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a513a8d3cf286f755ebc2a1224"`);
        await queryRunner.query(`DROP INDEX "IDX_a513a8d3cf286f755ebc2a1224"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" DROP COLUMN "CLINIC_ID"`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" ADD "CLINIC_ID" varchar2(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_a513a8d3cf286f755ebc2a1224" ON "CLINIC_SPECIALTIES" ("CLINIC_ID")`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" ADD "SPECIALTY_CODE" varchar2(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "CLINIC_SPECIALTIES" ADD "CLINIC_CODE" varchar2(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_d2590aa38e1748047aa3ea045c" ON "CLINIC_SPECIALTIES" ("SPECIALTY_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_3e21f470c6c2a163cd6532d683" ON "CLINIC_SPECIALTIES" ("CLINIC_CODE")`);
    }

}
