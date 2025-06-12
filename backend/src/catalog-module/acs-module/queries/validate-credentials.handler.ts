import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ValidateCredentialsCommand } from "./validate-credentials.command";
import { BASE_SCHEMA } from "../../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@QueryHandler(ValidateCredentialsCommand)
export class ValidateCredentialsHandler implements IQueryHandler<ValidateCredentialsCommand> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.ACS_RS) private readonly dataSource: DataSource
    ) {}

    async execute(query: ValidateCredentialsCommand) {
        const { dto } = query;
        const { username, password } = dto;

        const queryBuilder = `
            SELECT 
                COUNT(*) AS "total"
            FROM ACS_USER
            WHERE LOGINNAME = :P1 AND PASSWORD = :P2
        `;

        const queryData = await this.dataSource.query(queryBuilder, [username, password]);

        if (queryData[0].total === 0) {
            return false;
        }

        return true;
    }
}  