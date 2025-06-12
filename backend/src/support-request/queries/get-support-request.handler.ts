import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSupportRequestQuery } from "./get-support-request.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SupportRequest } from "../entities/support-request.entity";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetSupportRequestQuery)
export class GetSupportRequestHandler implements IQueryHandler<GetSupportRequestQuery> {
    constructor(
        @InjectRepository(SupportRequest)
        private readonly supportRequestRepository: Repository<SupportRequest>,
    ) {}

    async execute(query: GetSupportRequestQuery) {
        const { id, userId } = query;
        const supportRequest = await this.supportRequestRepository.findOne({ where: { id, userId } });
        if (!supportRequest) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SUPPORT_REQUEST);
        }
        return supportRequest;
    }
}