import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSatisfactionSurveyServiceCommand } from "./update-satisfaction-survey-service.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { SatisfactionSurveyStatus, SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { ERROR_409 } from "@common/error-messages/error-409";

@CommandHandler(UpdateSatisfactionSurveyServiceCommand)
export class UpdateSatisfactionSurveyServiceHandler implements ICommandHandler<UpdateSatisfactionSurveyServiceCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: UpdateSatisfactionSurveyServiceCommand): Promise<any> {
        const { userId, satisfactionSurveyId, updateSatisfactionSurveyDto } = command;

        const currentSatisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: {
                id: satisfactionSurveyId,
                userId: userId,
                surveyType: SatisfactionSurveyType.SERVICE,
            }
        });

        if (!currentSatisfactionSurvey) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SURVEY);
        }
        if (currentSatisfactionSurvey.surveyStatus === SatisfactionSurveyStatus.COMPLETED) {
            throw new ConflictException(ERROR_409.SERVICE_ALREADY_COMPLETED_NOT_ALLOWED_UPDATE);
        }

        return await this.satisfactionSurveyRepository.update(
            currentSatisfactionSurvey.id, {
                ...updateSatisfactionSurveyDto,
                updatedBy: userId,
            }
        );
    }
}