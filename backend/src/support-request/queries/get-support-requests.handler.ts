import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSupportRequestsQuery } from "./get-support-requests.query";
import { SupportRequest } from "../entities/support-request.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";

@QueryHandler(GetSupportRequestsQuery)
export class GetSupportRequestsHandler implements IQueryHandler<GetSupportRequestsQuery> {
    constructor(
        @InjectRepository(SupportRequest)
        private readonly supportRequestRepository: Repository<SupportRequest>,
    ) {}

    async execute(query: GetSupportRequestsQuery) {
        const { userId, getSupportRequestsDto } = query;
        const page = getSupportRequestsDto.page && getSupportRequestsDto.page > 0 ? getSupportRequestsDto.page : PAGE_DEFAULT;
        const limit = getSupportRequestsDto.limit && getSupportRequestsDto.limit > 0 ? getSupportRequestsDto.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;
        
        const [supportRequests, total] = await this.supportRequestRepository.findAndCount({
            where: { userId },
            skip: offset,
            take: limit,
        });

        return {
            data: supportRequests,
            pagination: {
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
              },
        };
    }
}