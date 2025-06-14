import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSatisfactionSurveyCommand } from "./create-satisfaction-survey.command";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";
import { MESSAGE_COMMON } from "@common/message.common";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateSatisfactionSurveyCommand)
export class CreateSatisfactionSurveyHandler implements ICommandHandler<CreateSatisfactionSurveyCommand> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(command: CreateSatisfactionSurveyCommand): Promise<any> {
        const { userId, createSatisfactionSurveyDto } = command;
        const { treatmentCode, serviceReqCode } = createSatisfactionSurveyDto;

        const surveyExists = await this.checkDuplicateSurvey(userId, treatmentCode, serviceReqCode);
        if (surveyExists) throw new BadRequestException(MESSAGE_COMMON.SURVEY_ALREADY_EXISTS);

        const surveyType = serviceReqCode ? SatisfactionSurveyType.SERVICE : SatisfactionSurveyType.TREATMENT;

        const satisfactionSurvey = this.satisfactionSurveyRepository.create({
            userId,
            createdBy: userId,
            surveyType,
            ...createSatisfactionSurveyDto
        });

        return this.satisfactionSurveyRepository.save(satisfactionSurvey);
    }

    private async checkDuplicateSurvey(userId: string, treatmentCode: string, 
        serviceReqCode?: string): Promise<boolean> {
        const whereClause: any = { userId, treatmentCode };
        if (serviceReqCode) whereClause.serviceReqCode = serviceReqCode;

        return !!(await this.satisfactionSurveyRepository.findOne({ where: whereClause }));
    }
}