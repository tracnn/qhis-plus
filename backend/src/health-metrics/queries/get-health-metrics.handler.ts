import { IQueryHandler } from "@nestjs/cqrs";
import { GetlHealthMetricsQuery } from "./get-health-metrics.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "../../common/pagination.util";

@QueryHandler(GetlHealthMetricsQuery)
export class GetlHealthMetricsHandler implements IQueryHandler<GetlHealthMetricsQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.DEFAULT)
        private readonly dataSource: DataSource,
    ) {}

    async execute(query: GetlHealthMetricsQuery): Promise<any> {
        const { userId, getlHealthMetricsDto } = query;
        const page = getlHealthMetricsDto.page && getlHealthMetricsDto.page > 0 ? getlHealthMetricsDto.page : PAGE_DEFAULT;
        const limit = getlHealthMetricsDto.limit && getlHealthMetricsDto.limit > 0 ? getlHealthMetricsDto.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;

        const [healthMetrics, countResult] = await Promise.all([
            this.dataSource.query(
                ` 
                SELECT 
                    HM.ID AS "id",
                    HM.METRIC_DATE AS "metricDate",
                    HM.PULSE AS "pulse",
                    HM.SYSTOLIC AS "systolic",
                    HM.DIASTOLIC AS "diastolic",
                    HM.HEIGHT_CM AS "heightCm",
                    HM.WEIGHT_KG AS "weightKg",
                    HM.BMI AS "bmi",
                    HM.BMI_STATUS AS "bmiStatus",
                    HM.BLOOD_PRESSURE_STATUS AS "bloodPressureStatus",
                    HM.NOTE AS "note",
                    COALESCE(FM.ID, U.ID) AS "subjectId",
                    COALESCE(FM.FULL_NAME, U.FULL_NAME) AS "subjectName",
                    COALESCE(FM.GENDER_CODE, U.GENDER_CODE) AS "subjectGenderCode",
                    COALESCE(FM.BIRTH_DATE, U.BIRTH_DATE) AS "subjectBirthDate"
                FROM 
                    HEALTH_METRICS HM
                LEFT JOIN 
                    USERS U ON HM.USER_ID = U.ID
                LEFT JOIN 
                    FAMILY_MEMBERS FM ON HM.FAMILY_MEMBER_ID = FM.ID
                WHERE 
                    HM.USER_ID = :P1
                    ORDER BY HM.METRIC_DATE DESC
                    OFFSET :P2 ROWS FETCH NEXT :P3 ROWS ONLY
                `,
                [userId, offset, limit]
            ),
            this.dataSource.query(
                `
                SELECT COUNT(*) AS "total"
                FROM HEALTH_METRICS HM
                WHERE HM.USER_ID = :P1
                `,
                [userId]
              ),
        ]);

        const total = parseInt(countResult[0].total, 10);

        return {
            data: healthMetrics,
            pagination: buildPagination(page, limit, total)
        };
    }
}