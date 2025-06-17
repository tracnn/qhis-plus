import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1750125228965 implements MigrationInterface {
    name = 'Update1750125228965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD "HBA1C" number`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD "GLUCOSE" number`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP COLUMN "GLUCOSE"`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP COLUMN "HBA1C"`);
    }

}
