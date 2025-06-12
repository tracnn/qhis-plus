import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRelationListDto } from "../dto/get-relation-list.dto";
import { GetRelationListQuery } from "./get-relation-list.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "src/constant/common.constant";
import { DataSource } from "typeorm";

@QueryHandler(GetRelationListQuery)
export class GetRelationListHandler implements IQueryHandler<GetRelationListQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.EMR_RS)
        private readonly dataSource: DataSource,
    ) {}

    async execute(query: GetRelationListQuery): Promise<any> {
        const queryData = await this.dataSource.query(
            `
            SELECT 
                ID AS "id",
                RELATION_CODE AS "relationCode",
                RELATION_NAME AS "relationName"
            FROM
                EMR_RELATION
            WHERE
                IS_DELETE = 0
                AND IS_ACTIVE = 1
            ORDER BY
                RELATION_CODE
            `);
        
        return queryData;
    }
}