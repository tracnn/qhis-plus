import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "./get-user-by-id.query";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../../constant/common.constant";
import { plainToInstance } from "class-transformer";
import { GetUserByIdResponseDto } from "../dto/get-user-by-id-response.dto";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.ACS_RS)
        private readonly dataSource: DataSource
    ) {}

    async execute(query: GetUserByIdQuery) {
        const user = await this.dataSource.query(
            `SELECT 
                ID AS "userId",
                LOGINNAME AS "username",
                USERNAME AS "fullname",
                EMAIL AS "email",
                MOBILE AS "mobile"
            FROM ACS_USER WHERE id = :P1`,
            [query.userId]
        );

        if (!user) {
            throw new NotFoundException(ERROR_404.USER_NOT_FOUND);
        }

        return plainToInstance(GetUserByIdResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }
}