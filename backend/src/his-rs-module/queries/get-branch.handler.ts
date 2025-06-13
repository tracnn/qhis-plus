import { IQueryHandler } from "@nestjs/cqrs";
import { GetBranchQuery } from "./get-branch.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "../../common/pagination.util";

@QueryHandler(GetBranchQuery)
export class GetBranchQueryHandler implements IQueryHandler<GetBranchQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetBranchQuery): Promise<any> {
    const {  page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;

    const offset = (page - 1) * limit || 0;
    const queryBuilder = await this.dataSource.query(
      `
      SELECT 
        ID AS "id",
        BRANCH_CODE AS "branchCode",
        BRANCH_NAME AS "branchName",
        ADDRESS AS "address",
        IS_ACTIVE AS "isActive"
      FROM 
        HIS_BRANCH 
      WHERE 
        IS_ACTIVE = 1
      ORDER BY 
        BRANCH_CODE ASC
      OFFSET :P1 ROWS FETCH NEXT :P2 ROWS ONLY
      `,
      [offset, limit]
    );

    return {
        data: queryBuilder,
        pagination: buildPagination(queryBuilder.length, page, limit),
    }
  }
}