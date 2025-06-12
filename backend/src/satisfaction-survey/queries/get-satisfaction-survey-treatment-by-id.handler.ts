import { IQueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentByIdQuery } from "./get-satisfaction-survey-treatment-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetSatisfactionSurveyTreatmentByIdQuery)
export class GetSatisfactionSurveyTreatmentByIdHandler implements IQueryHandler<GetSatisfactionSurveyTreatmentByIdQuery> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(query: GetSatisfactionSurveyTreatmentByIdQuery): Promise<any> {
        const { satisfactionSurveyId, userId } = query;

        return await this.satisfactionSurveyRepository.findOne({
            where: { id: satisfactionSurveyId, userId },
        });
    }
}