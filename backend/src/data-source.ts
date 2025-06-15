import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { DataSource } from "typeorm";
import { HealthMetric } from "./health-metrics/entities/health-metric.entity";
import { FamilyMember } from "./family-members/entities/family-member.entity";
import { SatisfactionSurvey } from "./satisfaction-survey/entities/satisfaction-survey.entity";
import { SupportRequest } from "./support-request/entities/support-request.entity";
import { User } from "./user/entities/user.entity";
import { Otp } from "./otp/entities/otp.entity";
import { AppointmentSlot } from "./appointment/entities/appointment-slot.entity";
import { ClinicSpecialty } from "./clinic-specialty/entities/clinic-specialty.entity";
import { DoctorTitle } from "./doctor-title/entities/doctor-title.entity";
import { Appointment } from "./appointment/entities/appointment.entity";
import { Specialty } from "./specialty/entities/specialty.entity";
import { Title } from "./title/entities/title.entity";

export default new DataSource({
    type: "oracle",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 1521,
    username: process.env.DB_USERNAME || "HXT_RS",
    password: process.env.DB_PASSWORD || "HXT_RS",
    serviceName: process.env.DB_SERVICE_NAME || "FREEPDB1",
    entities: [
        HealthMetric, 
        User, 
        FamilyMember, 
        SatisfactionSurvey, 
        SupportRequest, 
        Otp,
        Appointment,
        AppointmentSlot,
        ClinicSpecialty,
        DoctorTitle,
        Specialty,
        Title,
    ],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsTableName: "MIGRATIONS",
    name: 'default',
});