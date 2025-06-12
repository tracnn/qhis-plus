import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSatisfactionSurveyTreatmentCommand } from "./create-satisfaction-survey-treatment.command";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";
import { MESSAGE_COMMON } from "@common/message.common";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateSatisfactionSurveyTreatmentCommand)
export class CreateSatisfactionSurveyTreatmentHandler implements ICommandHandler<CreateSatisfactionSurveyTreatmentCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: CreateSatisfactionSurveyTreatmentCommand): Promise<any> {
        const { userId, createSatisfactionSurveyDto } = command;

        const currentSatisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: {
                treatmentCode: createSatisfactionSurveyDto.treatmentCode,
                userId: userId,
            }
        });

        if (currentSatisfactionSurvey) {
            throw new BadRequestException(MESSAGE_COMMON.SURVEY_ALREADY_EXISTS);
        }

        const satisfactionSurvey = this.satisfactionSurveyRepository.create({
            userId,
            surveyType: SatisfactionSurveyType.TREATMENT,
            createdBy: userId,
            ...createSatisfactionSurveyDto
        });

        return await this.satisfactionSurveyRepository.save(satisfactionSurvey);
    }
}