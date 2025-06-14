import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { DataSource } from "typeorm";
import { buildPagination } from "../../common/pagination.util";
import { GetDoctorQuery } from "./get-doctor.query";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetDoctorQuery)
export class GetDoctorQueryHandler implements IQueryHandler<GetDoctorQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetDoctorQuery): Promise<any> {
    const { id } = query;

    const queryData = `
    SELECT 
        ID AS "id",
        LOGINNAME AS "doctorCode",
        TDL_USERNAME AS "doctorName",
        TITLE AS "title",
        TDL_MOBILE AS "phoneNumber",
        TDL_EMAIL AS "email"
    FROM 
        HIS_EMPLOYEE 
    WHERE 
        IS_ACTIVE = 1 AND TITLE IS NOT NULL AND IS_DOCTOR = 1
        AND ID = :P1
    `;

    const data = await Promise.all([
      this.dataSource.query(queryData, [id]),
    ]);

    if (data[0] === undefined) {
        throw new NotFoundException(ERROR_404.NOT_FOUND_DOCTOR);
    }
    return data[0];
  }
}