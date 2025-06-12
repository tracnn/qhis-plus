import { InjectDataSource } from "@nestjs/typeorm";
import { IQueryHandler } from "@nestjs/cqrs";
import { CheckTreatmentFinishedByTreatmentCodeQuery } from "./check-treatment-finished-by-treatment-code.query";
import { QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { ERROR_403 } from "../../common/error-messages/error-403";

@QueryHandler(CheckTreatmentFinishedByTreatmentCodeQuery)
export class CheckTreatmentFinishedByTreatmentCodeHandler implements IQueryHandler<CheckTreatmentFinishedByTreatmentCodeQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource
    ) {}

    async execute(query: CheckTreatmentFinishedByTreatmentCodeQuery): Promise<any> {
        const { treatmentCode } = query;

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
                TREATMENT_CODE = :P1
            `,
            [treatmentCode]
        );

        const treatment = data?.[0];


        if (!treatment || !treatment.isPause) {
            return false;
        }        

        return true;
    }
}