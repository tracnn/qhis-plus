import { DataSource } from "typeorm";
import { HealthMetric } from "./health-metrics/entities/health-metric.entity";
import { FamilyMember } from "./family-members/entities/family-member.entity";
import { SatisfactionSurvey } from "./satisfaction-survey/entities/satisfaction-survey.entity";
import { SupportRequest } from "./support-request/entities/support-request.entity";
import { User } from "./user/entities/user.entity";
import { Otp } from "./otp/entities/otp.entity";

export default new DataSource({
    type: "oracle",
    host: "192.168.7.248",
    port: 1521,
    username: "HXT_RS",
    password: "HXT_RS",
    serviceName: "orclstb",
    entities: [
        HealthMetric, 
        User, 
        FamilyMember, 
        SatisfactionSurvey, 
        SupportRequest, 
        Otp,
    ],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsTableName: "MIGRATIONS",
    name: 'default',
});