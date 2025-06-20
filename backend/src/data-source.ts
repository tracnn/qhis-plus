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
import { Qd3176Xml1s } from './bhxh/qd3176/entities/qd3176-xml1s.entity';
import { Qd3176Xml2s } from './bhxh/qd3176/entities/qd3176-xml2s.entity';
import { Qd3176Xml3s } from './bhxh/qd3176/entities/qd3176-xml3s.entity';
import { Qd3176Xml4s } from './bhxh/qd3176/entities/qd3176-xml4s.entity';
import { Qd3176Xml5s } from './bhxh/qd3176/entities/qd3176-xml5s.entity';
import { Qd3176Xml6s } from './bhxh/qd3176/entities/qd3176-xml6s.entity';
import { Qd3176Xml7s } from './bhxh/qd3176/entities/qd3176-xml7s.entity';
import { Qd3176Xml8s } from './bhxh/qd3176/entities/qd3176-xml8s.entity';
import { Qd3176Xml9s } from './bhxh/qd3176/entities/qd3176-xml9s.entity';
import { Qd3176Xml10s } from './bhxh/qd3176/entities/qd3176-xml10s.entity';
import { Qd3176Xml11s } from './bhxh/qd3176/entities/qd3176-xml11s.entity';
import { Qd3176Xml12s } from './bhxh/qd3176/entities/qd3176-xml12s.entity';
import { Qd3176Xml13s } from './bhxh/qd3176/entities/qd3176-xml13s.entity';
import { Qd3176Xml14s } from './bhxh/qd3176/entities/qd3176-xml14s.entity';
import { Qd3176Xml15s } from './bhxh/qd3176/entities/qd3176-xml15s.entity';

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
        Qd3176Xml1s, 
        Qd3176Xml2s, 
        Qd3176Xml3s, 
        Qd3176Xml4s, 
        Qd3176Xml5s, 
        Qd3176Xml6s, 
        Qd3176Xml7s, 
        Qd3176Xml8s, 
        Qd3176Xml9s, 
        Qd3176Xml10s, 
        Qd3176Xml11s, 
        Qd3176Xml12s, 
        Qd3176Xml13s, 
        Qd3176Xml14s, 
        Qd3176Xml15s,     
    ],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsTableName: "MIGRATIONS",
    name: 'default',
});