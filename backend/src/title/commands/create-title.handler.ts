import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateTitleCommand } from "./create-title.command";
import { Repository } from "typeorm";
import { Title } from "../entities/title.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_400 } from "@common/error-messages/error-400";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateTitleCommand)
export class CreateTitleHandler implements ICommandHandler<CreateTitleCommand> {
    constructor(
        @InjectRepository(Title)
        private readonly titleRepository: Repository<Title>,
    ) {}

    async execute(command: CreateTitleCommand): Promise<any> {
        const { titleCode } = command.createTitleDto;
        const checkTitle = await this.titleRepository.findOne({ where: { titleCode } });
        if (checkTitle) {
            throw new BadRequestException(ERROR_400.TITLE_ALREADY_EXISTS);
        }
        const title = this.titleRepository.create(command.createTitleDto);
        return this.titleRepository.save(title);
    }
}