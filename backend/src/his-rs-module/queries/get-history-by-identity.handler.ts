import { NotFoundException, Logger } from "@nestjs/common";
import { GetHistoryByIdentityQuery } from "./get-history-by-identity.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { GetHistoryByIdentityDto } from "../dto/get-history-by-identity.dto";
import { ERROR_404 } from "@common/error-messages/error-404";
import { OrganizationConfigService } from "../../common/organization-config.service";
import { buildPagination } from "../../common/pagination.util";

@QueryHandler(GetHistoryByIdentityQuery)
export class GetHistoryByIdentityHandler implements IQueryHandler<GetHistoryByIdentityQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private dataSource: DataSource,
        private readonly orgConfig: OrganizationConfigService
    ) {}

    async execute(query: GetHistoryByIdentityDto): Promise<any> {
        const { identityNumber, page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query;

        const offset = (page - 1) * limit;

        const queryTotal = 
        `
        SELECT COUNT(*) AS TOTAL
        FROM HIS_TREATMENT HT
        JOIN HIS_PATIENT HP ON HP.ID = HT.PATIENT_ID
        WHERE (HP.CCCD_NUMBER = :P1 OR HP.SOCIAL_INSURANCE_NUMBER = :P2)
        `;

        // BƯỚC 1: Tìm bệnh nhân trong HIS_PATIENT

        const queryData = 
        `
        SELECT
            HT.ID AS "id",
            HT.TREATMENT_CODE AS "treatmentCode",
            HT.TDL_PATIENT_CODE AS "patientCode",
            HT.TDL_PATIENT_NAME AS "patientName",
            TO_CHAR(TO_DATE(HT.TDL_PATIENT_DOB, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY') AS "patientDob",
            HT.TDL_PATIENT_GENDER_NAME AS "patientGenderName",
            TO_CHAR(TO_DATE(HT.IN_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI') AS "inTime",
            TO_CHAR(TO_DATE(HT.OUT_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI') AS "outTime",
            HTT.TREATMENT_TYPE_NAME AS "treatmentTypeName",
            HTET.TREATMENT_END_TYPE_NAME AS "treatmentEndTypeName",
            HTR.TREATMENT_RESULT_NAME AS "treatmentResultName",
            COALESCE(HT.DOCTOR_USERNAME, HT.END_USERNAME) AS "doctorUsername",
            HT.ICD_CODE AS "icdCode",
            HT.ICD_NAME AS "icdName",
            HT.ICD_SUB_CODE AS "icdSubCode",
            HT.ICD_TEXT AS "icdText",
            HT.IS_PAUSE AS "isPause"
        FROM
            HIS_TREATMENT HT
        JOIN
            HIS_PATIENT HP ON HP.ID = HT.PATIENT_ID
        JOIN
            HIS_TREATMENT_TYPE HTT ON HTT.ID = HT.TDL_TREATMENT_TYPE_ID
        LEFT JOIN
            HIS_TREATMENT_END_TYPE HTET ON HTET.ID = HT.TREATMENT_END_TYPE_ID
        LEFT JOIN
            HIS_TREATMENT_RESULT HTR ON HTR.ID = HT.TREATMENT_RESULT_ID
        WHERE
            (HP.CCCD_NUMBER = :P1 OR HP.SOCIAL_INSURANCE_NUMBER = :P2)
        ORDER BY HT.IN_TIME DESC
        OFFSET :P3 ROWS FETCH NEXT :P4 ROWS ONLY
        `;

        const [data, totalResult] = await Promise.all([
            this.dataSource.query(queryData, [identityNumber, identityNumber, offset, limit]),
            this.dataSource.query(queryTotal, [identityNumber, identityNumber])
        ]);

        const total = Number(totalResult[0]?.TOTAL || 0);
    
        if (!data) {
            throw new NotFoundException([ERROR_404.NOT_FOUND_PATIENT]);
        }
    
        const fieldsToNull: string[] = [];
        if (!this.orgConfig.showTreatmentEndTypeName) fieldsToNull.push('treatmentEndTypeName');
        if (!this.orgConfig.showTreatmentResultName) fieldsToNull.push('treatmentResultName');
        if (!this.orgConfig.showIcdSubCode) fieldsToNull.push('icdSubCode');
        if (!this.orgConfig.showIcdText) fieldsToNull.push('icdText');

        const filteredData = data.map((row: any) => {
            const newRow = { ...row };
            fieldsToNull.forEach(field => newRow[field] = null);
            return newRow;
        });
        
        return {
            data: filteredData,
            pagination: buildPagination(page, limit, total)
        };
    }
}