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
                ID AS "userId",
                LOGINNAME AS "username",
                USERNAME AS "fullname",
                EMAIL AS "email"
            FROM ACS_USER
            WHERE LOGINNAME = :P1 AND PASSWORD = :P2
        `;

        const result = await this.dataSource.query(queryBuilder, [username, password]);

        if (!result || result.length === 0) {
            return null;
        }

        const user = result[0];
        return {
            userId: user.userId,
            username: user.username,
            fullname: user.fullname,
            email: user.email
        };
    }
}  