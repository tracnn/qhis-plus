import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetServicesQuery } from "./get-services.query";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { buildPagination } from "@common/pagination.util";

@QueryHandler(GetServicesQuery)
export class GetServicesHandler implements IQueryHandler<GetServicesQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS)
        private readonly dataSource: DataSource,
    ) {}

    async execute(query: GetServicesQuery) {
        const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;
        const offset = (page - 1) * limit;

        const services = await this.dataSource.query(
            `
                SELECT * FROM HIS_SERVICE
                WHERE IS_ACTIVE = 1
            `,
        );
    }
}