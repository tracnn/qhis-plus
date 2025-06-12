import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSupportRequestCommand } from "./create-support-request.command";
import { SupportRequest } from "../entities/support-request.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(CreateSupportRequestCommand)
export class CreateSupportRequestCommandHandler implements ICommandHandler<CreateSupportRequestCommand> {
    constructor(
        @InjectRepository(SupportRequest)
        private readonly supportRequestRepository: Repository<SupportRequest>,
    ) {}
    async execute(command: CreateSupportRequestCommand) {
        const { createSupportRequestDto, userId } = command;
        const supportRequest = this.supportRequestRepository.create({
            ...createSupportRequestDto,
            userId,
            createdBy: userId,
        });
        
        return this.supportRequestRepository.save(supportRequest);
    }
}