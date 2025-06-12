import { IQueryHandler } from "@nestjs/cqrs";
import { CheckTreatmentFinishedByTreatmentIdQuery } from "./check-treatment-finished-by-treatment-id.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { DataSource } from "typeorm";

@QueryHandler(CheckTreatmentFinishedByTreatmentIdQuery)
export class CheckTreatmentFinishedByTreatmentIdHandler implements IQueryHandler<CheckTreatmentFinishedByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource
    ) {}

    async execute(query: CheckTreatmentFinishedByTreatmentIdQuery): Promise<any> {
        const { treatmentId } = query;

        const data = await this.dataSource.query(
            `
            SELECT 
                ID AS "id",
                TREATMENT_CODE AS "treatmentCode",
                IS_PAUSE AS "isPause",
                OUT_TIME AS "outTime",
                FEE_LOCK_TIME AS "feeLockTime"
            FROM 
                HIS_TREATMENT 
            WHERE 
                ID = :P1
            `,
            [treatmentId]
        );

        const treatment = data?.[0];

        if (!treatment || !treatment.isPause) {
            return false;
        }

        return true;
    }
}