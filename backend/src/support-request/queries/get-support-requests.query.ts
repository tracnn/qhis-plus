import { IQuery } from "@nestjs/cqrs";
import { GetSupportRequestsDto } from "../dto/get-support-requests.dto";

export class GetSupportRequestsQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getSupportRequestsDto: GetSupportRequestsDto,
    ) {}
}