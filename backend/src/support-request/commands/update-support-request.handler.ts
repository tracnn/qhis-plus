import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SupportRequest } from "../entities/support-request.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSupportRequestCommand } from "./update-support-request.command";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { ERROR_403 } from "@common/error-messages/error-403";
import { SupportRequestStatus } from "../enums/support-request.enum";

@CommandHandler(UpdateSupportRequestCommand)
export class UpdateSupportRequestCommandHandler implements ICommandHandler<UpdateSupportRequestCommand> {
    constructor(
        @InjectRepository(SupportRequest)
        private readonly supportRequestRepository: Repository<SupportRequest>,
    ) {}
    async execute(command: UpdateSupportRequestCommand) {
        const { updateSupportRequestDto, userId, supportRequestId } = command;
        const supportRequest = await this.supportRequestRepository.findOne({ where: { id: supportRequestId } });
        
        if (!supportRequest) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SUPPORT_REQUEST);
        }

        if (supportRequest.userId !== userId) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_UPDATE_SUPPORT_REQUEST);
        }

        if (
            supportRequest.requestStatus === SupportRequestStatus.COMPLETED ||
            supportRequest.requestStatus === SupportRequestStatus.CANCELLED
        ) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_UPDATE_SUPPORT_REQUEST);
        }

        const updateSupportRequest = await this.supportRequestRepository.update(supportRequestId, {
            ...updateSupportRequestDto,
            updatedBy: userId,
        });
        
        return updateSupportRequest;
    }
}