import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSatisfactionSurveyTreatmentCommand } from "./update-satisfaction-survey.command";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { MESSAGE_COMMON } from "@common/message.common";
import { SatisfactionSurveyStatus, SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";

@CommandHandler(UpdateSatisfactionSurveyTreatmentCommand)
export class UpdateSatisfactionSurveyTreatmentHandler implements ICommandHandler<UpdateSatisfactionSurveyTreatmentCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: UpdateSatisfactionSurveyTreatmentCommand): Promise<any> {
        const { satisfactionSurveyId, userId, updateSatisfactionSurveyDto } = command;

        const currentSatisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: {
                id: satisfactionSurveyId,
                userId: userId,
                surveyType: SatisfactionSurveyType.TREATMENT,
            }
        });

        if (!currentSatisfactionSurvey) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_SURVEY);
        }
        if (currentSatisfactionSurvey.surveyStatus === SatisfactionSurveyStatus.COMPLETED) {
            throw new BadRequestException(MESSAGE_COMMON.SURVEY_ALREADY_COMPLETED);
        }

        return await this.satisfactionSurveyRepository.update(
            currentSatisfactionSurvey.id, {
                ...updateSatisfactionSurveyDto,
                updatedBy: userId,
            }
        );
    }
}