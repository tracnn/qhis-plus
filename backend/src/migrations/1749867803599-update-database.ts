import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1749867803599 implements MigrationInterface {
    name = 'UpdateDatabase1749867803599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USERS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USERNAME" varchar2(255) NOT NULL, "EMAIL" varchar2(255), "PASSWORD" varchar2(255) NOT NULL, "IS_LOCKED" number DEFAULT 0 NOT NULL, "LAST_LOGIN_AT" timestamp, "LAST_LOGIN_IP" varchar2(255), "LAST_LOGIN_USER_AGENT" varchar2(255), "FULL_NAME" varchar2(255), "BIRTH_DATE" varchar2(255), "GENDER_CODE" number, "ADDRESS" varchar2(255), "PROVINCE_ID" number, "DISTRICT_ID" number, "COMMUNE_ID" number, "HEIN_CARD_NUMBER" varchar2(255), "INSURANCE_NUMBER" varchar2(10), "IDENTITY_NUMBER" varchar2(12), "PHONE_NUMBER" varchar2(10), "CAREER_ID" number, "ETHNIC_ID" number, "NATIONAL_ID" number, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_475d4b511309ada89807bc2d40b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_USERNAME" ON "USERS" ("USERNAME")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_EMAIL" ON "USERS" ("EMAIL")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_INSURANCE" ON "USERS" ("INSURANCE_NUMBER")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_IDENTITY_ID" ON "USERS" ("IDENTITY_NUMBER")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_USERS_PHONE_NUMBER" ON "USERS" ("PHONE_NUMBER")`);
        await queryRunner.query(`CREATE TABLE "FAMILY_MEMBERS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USER_ID" varchar2(36) NOT NULL, "FULL_NAME" varchar2(255) NOT NULL, "BIRTH_DATE" varchar2(255) NOT NULL, "GENDER_CODE" number NOT NULL, "IDENTITY_NUMBER" varchar2(255) NOT NULL, "PHONE_NUMBER" varchar2(255), "EMAIL" varchar2(255), "RELATIONSHIP_ID" number NOT NULL, "PROVINCE_ID" number, "DISTRICT_ID" number, "COMMUNE_ID" number, "HEIN_CARD_NUMBER" varchar2(255), "INSURANCE_NUMBER" varchar2(10), "ADDRESS" varchar2(255), "CAREER_ID" number, "ETHNIC_ID" number, "NATIONAL_ID" number, "IS_ACTIVE" number DEFAULT 1 NOT NULL, CONSTRAINT "PK_80b0df21d3cc9887f2dd3af6edf" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c235ba71a83aa3e13f75f54582" ON "FAMILY_MEMBERS" ("USER_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_404f708f4739218e7cfececc6c" ON "FAMILY_MEMBERS" ("IDENTITY_NUMBER")`);
        await queryRunner.query(`CREATE INDEX "IDX_e12c6ea1836a09d7b59285ffe8" ON "FAMILY_MEMBERS" ("INSURANCE_NUMBER")`);
        await queryRunner.query(`CREATE TABLE "HEALTH_METRICS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USER_ID" varchar2(36) NOT NULL, "FAMILY_MEMBER_ID" varchar2(36), "PULSE" number, "SYSTOLIC" number, "DIASTOLIC" number, "HEIGHT_CM" number, "WEIGHT_KG" number, "NOTE" varchar2(255), "BMI" number, "BMI_STATUS" varchar2(255), "BLOOD_PRESSURE_STATUS" varchar2(255), "METRIC_DATE" timestamp NOT NULL, CONSTRAINT "PK_9cb7fc9be8aa24500f0a3c22f39" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df12b3018c0a1ab436c1f8ddd7" ON "HEALTH_METRICS" ("USER_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_f8c3f17e0e496f987a5e4fae91" ON "HEALTH_METRICS" ("FAMILY_MEMBER_ID")`);
        await queryRunner.query(`CREATE TABLE "SATISFACTION_SURVEYS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USER_ID" varchar2(255) NOT NULL, "PATIENT_CODE" varchar2(255) NOT NULL, "TREATMENT_CODE" varchar2(255) NOT NULL, "SERVICE_REQ_CODE" varchar2(255), "SURVEY_STATUS" varchar2(255) DEFAULT 'PENDING' NOT NULL, "SURVEY_TYPE" varchar2(255) NOT NULL, "SURVEY_SCORE" number NOT NULL, "SURVEY_COMMENT" varchar2(255), CONSTRAINT "PK_fb80d66f8aa3021f13202ec3c69" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c05eb491b0379f9e2e46e7272e" ON "SATISFACTION_SURVEYS" ("USER_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_c6e0a29befdc606cfd45bb2196" ON "SATISFACTION_SURVEYS" ("TREATMENT_CODE")`);
        await queryRunner.query(`CREATE TABLE "SUPPORT_REQUESTS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "USER_ID" varchar2(255) NOT NULL, "PATIENT_CODE" varchar2(255) NOT NULL, "TREATMENT_CODE" varchar2(255) NOT NULL, "REQUEST_TYPE" varchar2(255) NOT NULL, "REQUEST_STATUS" varchar2(255) DEFAULT 'PENDING' NOT NULL, "REQUEST_CONTENT" varchar2(255), "REQUEST_ATTACHMENT" varchar2(255), CONSTRAINT "PK_6119f7f9b23d868973112f45c65" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2f8dc11810648936ce25d92ec0" ON "SUPPORT_REQUESTS" ("USER_ID")`);
        await queryRunner.query(`CREATE INDEX "IDX_93798238262423f0b9f4a01cb7" ON "SUPPORT_REQUESTS" ("PATIENT_CODE")`);
        await queryRunner.query(`CREATE INDEX "IDX_7a87dbc7af377275e10247e48d" ON "SUPPORT_REQUESTS" ("TREATMENT_CODE")`);
        await queryRunner.query(`CREATE TABLE "OTPS" ("ID" varchar2(36), "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "UPDATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "CREATED_BY" varchar2(255), "UPDATED_BY" varchar2(255), "VERSION" number NOT NULL, "PHONE_NUMBER" varchar2(255) NOT NULL, "OTP_CODE" varchar2(255) NOT NULL, "OTP_TYPE" varchar2(255) NOT NULL, "OTP_CHANNEL" varchar2(255), "OTP_STATUS" varchar2(255) DEFAULT 'PENDING' NOT NULL, "EXPIRES_AT" timestamp NOT NULL, "ATTEMPTS" number DEFAULT 0 NOT NULL, "MAX_ATTEMPTS" number DEFAULT 5 NOT NULL, CONSTRAINT "PK_2ebae4cddd59770c77140a50857" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_149840a238ecd3c6c842c09ed5" ON "OTPS" ("PHONE_NUMBER")`);
        await queryRunner.query(`CREATE INDEX "IDX_197b678f21c7ec72325dc1e65f" ON "OTPS" ("OTP_TYPE")`);
        await queryRunner.query(`ALTER TABLE "FAMILY_MEMBERS" ADD CONSTRAINT "FK_c235ba71a83aa3e13f75f545821" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID")`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD CONSTRAINT "FK_df12b3018c0a1ab436c1f8ddd7d" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("ID")`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" ADD CONSTRAINT "FK_f8c3f17e0e496f987a5e4fae917" FOREIGN KEY ("FAMILY_MEMBER_ID") REFERENCES "FAMILY_MEMBERS" ("ID")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP CONSTRAINT "FK_f8c3f17e0e496f987a5e4fae917"`);
        await queryRunner.query(`ALTER TABLE "HEALTH_METRICS" DROP CONSTRAINT "FK_df12b3018c0a1ab436c1f8ddd7d"`);
        await queryRunner.query(`ALTER TABLE "FAMILY_MEMBERS" DROP CONSTRAINT "FK_c235ba71a83aa3e13f75f545821"`);
        await queryRunner.query(`DROP INDEX "IDX_197b678f21c7ec72325dc1e65f"`);
        await queryRunner.query(`DROP INDEX "IDX_149840a238ecd3c6c842c09ed5"`);
        await queryRunner.query(`DROP TABLE "OTPS"`);
        await queryRunner.query(`DROP INDEX "IDX_7a87dbc7af377275e10247e48d"`);
        await queryRunner.query(`DROP INDEX "IDX_93798238262423f0b9f4a01cb7"`);
        await queryRunner.query(`DROP INDEX "IDX_2f8dc11810648936ce25d92ec0"`);
        await queryRunner.query(`DROP TABLE "SUPPORT_REQUESTS"`);
        await queryRunner.query(`DROP INDEX "IDX_c6e0a29befdc606cfd45bb2196"`);
        await queryRunner.query(`DROP INDEX "IDX_c05eb491b0379f9e2e46e7272e"`);
        await queryRunner.query(`DROP TABLE "SATISFACTION_SURVEYS"`);
        await queryRunner.query(`DROP INDEX "IDX_f8c3f17e0e496f987a5e4fae91"`);
        await queryRunner.query(`DROP INDEX "IDX_df12b3018c0a1ab436c1f8ddd7"`);
        await queryRunner.query(`DROP TABLE "HEALTH_METRICS"`);
        await queryRunner.query(`DROP INDEX "IDX_e12c6ea1836a09d7b59285ffe8"`);
        await queryRunner.query(`DROP INDEX "IDX_404f708f4739218e7cfececc6c"`);
        await queryRunner.query(`DROP INDEX "IDX_c235ba71a83aa3e13f75f54582"`);
        await queryRunner.query(`DROP TABLE "FAMILY_MEMBERS"`);
        await queryRunner.query(`DROP INDEX "IDX_USERS_PHONE_NUMBER"`);
        await queryRunner.query(`DROP INDEX "IDX_USERS_IDENTITY_ID"`);
        await queryRunner.query(`DROP INDEX "IDX_USERS_INSURANCE"`);
        await queryRunner.query(`DROP INDEX "IDX_USERS_EMAIL"`);
        await queryRunner.query(`DROP INDEX "IDX_USERS_USERNAME"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
    }

}
