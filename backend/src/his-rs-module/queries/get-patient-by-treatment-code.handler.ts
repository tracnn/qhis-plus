import { DataSource } from "typeorm";
import { IQueryHandler } from "@nestjs/cqrs";
import { GetPatientByTreatmentCodeQuery } from "./get-patient-by-treatment-code.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "src/constant/common.constant";

@QueryHandler(GetPatientByTreatmentCodeQuery)
export class GetPatientByTreatmentCodeHandler implements IQueryHandler<GetPatientByTreatmentCodeQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS)
        private readonly dataSource: DataSource
    ) {}

    async execute(query: GetPatientByTreatmentCodeQuery): Promise<any> {
        const { treatmentCode } = query;
        const data = await this.dataSource.query(
            `
            SELECT 
                HP.CCCD_NUMBER AS "identityNumber",
                HP.SOCIAL_INSURANCE_NUMBER AS "insuranceNumber"
            FROM 
                HIS_PATIENT HP
            JOIN
                HIS_TREATMENT HT ON HT.PATIENT_ID = HP.ID
            WHERE 
                HT.TREATMENT_CODE = :P1
            `,
            [treatmentCode]
        );

        return data;
    }
}