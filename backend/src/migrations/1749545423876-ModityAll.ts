import { MigrationInterface, QueryRunner } from "typeorm";

export class ModityAll1749545423876 implements MigrationInterface {
    name = 'ModityAll1749545423876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FAMILY_MEMBERS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USER_ID" varchar2(36) NOT NULL, "FULL_NAME" varchar2(255) NOT NULL, "BIRTH_DATE" varchar2(255) NOT NULL, "GENDER_CODE" number NOT NULL, "IDENTITY_NUMBER" varchar2(255) NOT NULL, "PHONE_NUMBER" varchar2(255), "EMAIL" varchar2(255), "RELATIONSHIP_ID" number NOT NULL, "PROVINCE_ID" number, "DISTRICT_ID" number, "COMMUNE_ID" number, "HEIN_CARD_NUMBER" varchar2(255), "INSURANCE_NUMBER" varchar2(10), "ADDRESS" varchar2(255), "CAREER_ID" number, "ETHNIC_ID" number, "NATIONAL_ID" number, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_80b0df21d3cc9887f2dd3af6edf" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c235ba71a83aa3e13f75f54582" ON "FAMILY_MEMBERS" ("USER_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_404f708f4739218e7cfececc6c" ON "FAMILY_MEMBERS" ("IDENTITY_NUMBER")`);
        await queryRunner.query(`CREATE INDEX "IDX_e12c6ea1836a09d7b59285ffe8" ON "FAMILY_MEMBERS" ("INSURANCE_NUMBER")`);
        await queryRunner.query(`ALTER TABLE "FAMILY_MEMBERS" ADD CONSTRAINT "FK_c235ba71a83aa3e13f75f545821" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID")`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD CONSTRAINT "FK_df12b3018c0a1ab436c1f8ddd7d" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID")`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD CONSTRAINT "FK_f8c3f17e0e496f987a5e4fae917" FOREIGN KEY ("FAMILY_MEMBER_ID") REFERENCES "FAMILY_MEMBERS" ("ID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP CONSTRAINT "FK_f8c3f17e0e496f987a5e4fae917"`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP CONSTRAINT "FK_df12b3018c0a1ab436c1f8ddd7d"`);
        await queryRunner.query(`ALTER TABLE "FAMILY_MEMBERS" DROP CONSTRAINT "FK_c235ba71a83aa3e13f75f545821"`);
        await queryRunner.query(`DROP INDEX "IDX_e12c6ea1836a09d7b59285ffe8"`);
        await queryRunner.query(`DROP INDEX "IDX_404f708f4739218e7cfececc6c"`);
        await queryRunner.query(`DROP INDEX "IDX_c235ba71a83aa3e13f75f54582"`);
        await queryRunner.query(`DROP TABLE "FAMILY_MEMBERS"`);
    }

}
