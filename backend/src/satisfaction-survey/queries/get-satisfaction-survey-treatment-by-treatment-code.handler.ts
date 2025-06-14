import { IQueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentByTreatmentCodeQuery } from "./get-satisfaction-survey-treatment-by-treatment-code.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";

@QueryHandler(GetSatisfactionSurveyTreatmentByTreatmentCodeQuery)
export class GetSatisfactionSurveyTreatmentByTreatmentCodeHandler implements IQueryHandler<GetSatisfactionSurveyTreatmentByTreatmentCodeQuery> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(query: GetSatisfactionSurveyTreatmentByTreatmentCodeQuery): Promise<any> {
        const { userId, dto } = query;

        return await this.satisfactionSurveyRepository.findOne({
            where: { userId, treatmentCode: dto.treatmentCode },
        });
    }
}