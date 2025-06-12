import { IQueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentQuery } from "./get-satisfaction-survey-treatment.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { QueryHandler } from "@nestjs/cqrs";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";

@QueryHandler(GetSatisfactionSurveyTreatmentQuery)
export class GetSatisfactionSurveyTreatmentHandler implements IQueryHandler<GetSatisfactionSurveyTreatmentQuery> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(query: GetSatisfactionSurveyTreatmentQuery): Promise<any> {
        const { userId, getSatisfactionSurveyTreatmentDto } = query;

        const page = getSatisfactionSurveyTreatmentDto.page && getSatisfactionSurveyTreatmentDto.page > 0 ? 
        getSatisfactionSurveyTreatmentDto.page : PAGE_DEFAULT;
        const limit = getSatisfactionSurveyTreatmentDto.limit && getSatisfactionSurveyTreatmentDto.limit > 0 ? 
        getSatisfactionSurveyTreatmentDto.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;

        const [data, total] = await this.satisfactionSurveyRepository.findAndCount({
            where: { userId },
            skip: offset,
            take: limit,
        });

        return {
            data,
            pagination: {
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
            },
        };
    }
}