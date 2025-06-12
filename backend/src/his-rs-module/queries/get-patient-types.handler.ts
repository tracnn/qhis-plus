import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPatientTypesQuery } from "./get-patient-types.query";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";

@QueryHandler(GetPatientTypesQuery)
export class GetPatientTypesHandler implements IQueryHandler<GetPatientTypesQuery> {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource) {
    }

    async execute(query: GetPatientTypesQuery): Promise<any> {
        return [];
    }
}