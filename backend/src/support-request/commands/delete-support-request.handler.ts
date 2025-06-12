import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteSupportRequestCommand } from "./delete-support-request.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SupportRequest } from "../entities/support-request.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { ERROR_403 } from "@common/error-messages/error-403";
import { SupportRequestStatus } from "../enums/support-request.enum";

@CommandHandler(DeleteSupportRequestCommand)
export class DeleteSupportRequestHandler implements ICommandHandler<DeleteSupportRequestCommand> {
    constructor(
        @InjectRepository(SupportRequest)
        private readonly supportRequestRepository: Repository<SupportRequest>,
    ) {}

    async execute(command: DeleteSupportRequestCommand) {
        const { id, userId } = command;
        const supportRequest = await this.supportRequestRepository.findOne({ where: { id, userId } });
        if (!supportRequest) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SUPPORT_REQUEST);
        }
        
        if (supportRequest.requestStatus === SupportRequestStatus.COMPLETED ||
            supportRequest.requestStatus === SupportRequestStatus.CANCELLED
        ) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_DELETE_SUPPORT_REQUEST);
        }
        return await this.supportRequestRepository.remove(supportRequest);
    }
} 