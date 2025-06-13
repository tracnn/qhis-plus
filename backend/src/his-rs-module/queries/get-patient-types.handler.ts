import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientTypesQuery } from "./get-patient-types.query";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";

@QueryHandler(GetPatientTypesQuery)
export class GetPatientTypesHandler implements IQueryHandler<GetPatientTypesQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource) {
    }

    async execute(query: GetPatientTypesQuery): Promise<any> {
        const {  page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;

        const offset = (page - 1) * limit || 0;

        const queryBuilder = await this.dataSource.query(
            `
            SELECT 
                ID AS "id",
                PATIENT_TYPE_CODE AS "patientTypeCode",
                PATIENT_TYPE_NAME AS "patientTypeName"
            FROM 
                HIS_PATIENT_TYPE
            WHERE
                IS_ACTIVE = 1
            ORDER BY
                ID DESC
            OFFSET :P1 ROWS FETCH NEXT :P2 ROWS ONLY
            `, [offset, limit]);

        return queryBuilder;
    }
}