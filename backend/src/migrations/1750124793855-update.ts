import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1750124793855 implements MigrationInterface {
    name = 'Update1750124793855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD "BLOOD_PRESSURE_STATUS_NUMBER" number`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP COLUMN "BLOOD_PRESSURE_STATUS_NUMBER"`);
    }

}
