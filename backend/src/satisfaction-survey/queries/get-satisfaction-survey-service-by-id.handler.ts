import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyServiceByIdQuery } from "./get-satisfaction-survey-service-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";

@QueryHandler(GetSatisfactionSurveyServiceByIdQuery)
export class GetSatisfactionSurveyServiceByIdHandler implements IQueryHandler<GetSatisfactionSurveyServiceByIdQuery> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(query: GetSatisfactionSurveyServiceByIdQuery): Promise<any> {
        const { userId, satisfactionSurveyId } = query;

        return await this.satisfactionSurveyRepository.findOne({
            where: { id: satisfactionSurveyId, userId, surveyType: SatisfactionSurveyType.SERVICE },
        });
    }
}