import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTreatmentByTreatmentIdQuery } from "./get-treatment-by-treatment-id.query";
import { DataSource } from "typeorm";
import { BASE_SCHEMA } from "src/constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";

@QueryHandler(GetTreatmentByTreatmentIdQuery)
export class GetTreatmentByTreatmentIdHandler implements IQueryHandler<GetTreatmentByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource
    ) {}

    async execute(query: GetTreatmentByTreatmentIdQuery): Promise<any> {
        const { treatmentId } = query;
        const treatment = await this.dataSource.query(
            `
            SELECT 
                HP.ID AS "patientId",
                HT.ID AS "treatmentId",
                HP.PATIENT_CODE AS "patientCode",
                HT.TREATMENT_CODE AS "treatmentCode",
                HP.CCCD_NUMBER AS "identityNumber",
                HP.SOCIAL_INSURANCE_NUMBER AS "insuranceNumber"
            FROM 
                HIS_TREATMENT HT
            JOIN
                HIS_PATIENT HP ON HP.ID = HT.PATIENT_ID
            WHERE 
                HT.ID = :P1
            `,
            [treatmentId]
        );
        return treatment && treatment.length > 0 ? treatment[0] : false;
    }
}