import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSatisfactionSurveyServiceCommand } from "./create-satisfaction-survey-service.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";
import { BadRequestException } from "@nestjs/common";
import { MESSAGE_COMMON } from "@common/message.common";

@CommandHandler(CreateSatisfactionSurveyServiceCommand)
export class CreateSatisfactionSurveyServiceHandler implements ICommandHandler<CreateSatisfactionSurveyServiceCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: CreateSatisfactionSurveyServiceCommand): Promise<any> {
        const { userId, createSatisfactionSurveyDto } = command;

        const currentSatisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: {
                patientCode: createSatisfactionSurveyDto.patientCode,
                treatmentCode: createSatisfactionSurveyDto.treatmentCode,
                serviceReqCode: createSatisfactionSurveyDto.serviceReqCode,
                surveyType: SatisfactionSurveyType.SERVICE,
                userId: userId,
            },
        });

        if (currentSatisfactionSurvey) {
            throw new BadRequestException(MESSAGE_COMMON.SURVEY_SERVICE_ALREADY_EXISTS);
        }

        return await this.satisfactionSurveyRepository.save({
            ...createSatisfactionSurveyDto,
            surveyType: SatisfactionSurveyType.SERVICE,
            createdBy: userId,
            userId: userId,
        });
    }
}