import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1749951891212 implements MigrationInterface {
    name = 'Update1749951891212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SPECIALTIES" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "SPECIALTY_CODE" varchar2(255) NOT NULL, "SPECIALTY_NAME" varchar2(255) NOT NULL, "ORDER" number, "SPECIALTY_DESCRIPTION" varchar2(2000) NOT NULL, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_17e5b121fe09203435470e13c3c" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_45994e165148472ea6ec1051f0" ON "SPECIALTIES" ("SPECIALTY_CODE")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_45994e165148472ea6ec1051f0"`);
        await queryRunner.query(`DROP TABLE "SPECIALTIES"`);
    }

}
