import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteSatisfactionSurveyTreatmentCommand } from "./delete-satisfaction-survey-treatment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { MESSAGE_COMMON } from "@common/message.common";
import { SatisfactionSurveyStatus } from "../enums/satisfaction-survey.enum";

@CommandHandler(DeleteSatisfactionSurveyTreatmentCommand)
export class DeleteSatisfactionSurveyTreatmentHandler implements ICommandHandler<DeleteSatisfactionSurveyTreatmentCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: DeleteSatisfactionSurveyTreatmentCommand): Promise<any> {
        const { satisfactionSurveyId, userId } = command;

        const currentSatisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: { id: satisfactionSurveyId, userId },
        });

        if (!currentSatisfactionSurvey) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SURVEY);
        }

        if (currentSatisfactionSurvey.surveyStatus === SatisfactionSurveyStatus.COMPLETED) {
            throw new BadRequestException(MESSAGE_COMMON.SURVEY_ALREADY_COMPLETED);
        }

        return await this.satisfactionSurveyRepository.delete(satisfactionSurveyId);
    }
}