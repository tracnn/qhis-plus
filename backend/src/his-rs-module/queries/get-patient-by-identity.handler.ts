import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientByIdentityQuery } from "./get-patient-by-identity.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { DataSource } from "typeorm";

@QueryHandler(GetPatientByIdentityQuery)
export class GetPatientByIdentityHandler implements IQueryHandler<GetPatientByIdentityQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
    ) {}

    async execute(query: GetPatientByIdentityQuery) {
        const { identityNumber, insuranceNumber } = query.body;
        
        const patient = await this.dataSource.query(
            `
            SELECT 
                ID AS "id",
                CCCD_NUMBER AS "identityNumber",
                SOCIAL_INSURANCE_NUMBER AS "insuranceNumber"
            FROM 
                HIS_PATIENT 
            WHERE 
                CCCD_NUMBER = :P1
                OR SOCIAL_INSURANCE_NUMBER = :P2
            `,
            [identityNumber, insuranceNumber]
        );
        
        return patient;
    }
}