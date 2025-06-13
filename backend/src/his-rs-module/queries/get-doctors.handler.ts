import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorsDto } from "../dto/get-doctors.dto";
import { GetDoctorsQuery } from "./get-doctors.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { DataSource } from "typeorm";
import { buildPagination } from "../../common/pagination.util";

@QueryHandler(GetDoctorsQuery)
export class GetDoctorsQueryHandler implements IQueryHandler<GetDoctorsQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetDoctorsQuery): Promise<any> {
    const {  page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;

    const offset = (page - 1) * limit || 0;

    const queryTotal = `
      SELECT 
        COUNT(*) AS "total" 
    FROM 
        HIS_EMPLOYEE 
    WHERE 
        IS_ACTIVE = 1 AND TITLE IS NOT NULL AND IS_DOCTOR = 1
    `;

    const queryData = `
    SELECT 
        ID AS "id",
        TDL_USERNAME AS "username",
        TITLE AS "title"
    FROM 
        HIS_EMPLOYEE 
    WHERE 
        IS_ACTIVE = 1 AND TITLE IS NOT NULL AND IS_DOCTOR = 1
    ORDER BY TDL_USERNAME ASC
    OFFSET :P1 ROWS FETCH NEXT :P2 ROWS ONLY
    `;

    const [data, totalResult] = await Promise.all([
      this.dataSource.query(queryData, [offset, limit]),
      this.dataSource.query(queryTotal)
    ]);

    const total = Number(totalResult[0]?.total || 0);

    return {
        data,
        pagination: buildPagination(page, limit, total),
    }
  }
}