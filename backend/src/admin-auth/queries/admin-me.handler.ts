import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { AdminMeQuery } from "./admin-me.query";
import { GetUserByIdQuery } from "../../catalog-module/acs-module/queries/get-user-by-id.query";

@QueryHandler(AdminMeQuery)
export class AdminMeQueryHandler implements IQueryHandler<AdminMeQuery> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(query: AdminMeQuery) {
        return this.queryBus.execute(new GetUserByIdQuery(query.userId));
    }
}