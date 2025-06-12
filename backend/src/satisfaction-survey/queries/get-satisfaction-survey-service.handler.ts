import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyServiceQuery } from "./get-satisfaction-survey-service.query";
import { InjectRepository } from "@nestjs/typeorm";
import { SatisfactionSurvey } from "../entities/satisfaction-survey.entity";
import { Repository } from "typeorm";
import { SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";

@QueryHandler(GetSatisfactionSurveyServiceQuery)
export class GetSatisfactionSurveyServiceHandler implements IQueryHandler<GetSatisfactionSurveyServiceQuery> {
    constructor(
        @InjectRepository(SatisfactionSurvey)
        private readonly satisfactionSurveyRepository: Repository<SatisfactionSurvey>,
    ) {}

    async execute(query: GetSatisfactionSurveyServiceQuery): Promise<any> {
        const { userId, getSatisfactionSurveyServiceDto } = query;

        const page = getSatisfactionSurveyServiceDto.page && getSatisfactionSurveyServiceDto.page > 0 ? 
        getSatisfactionSurveyServiceDto.page : PAGE_DEFAULT;
        const limit = getSatisfactionSurveyServiceDto.limit && getSatisfactionSurveyServiceDto.limit > 0 ? 
        getSatisfactionSurveyServiceDto.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;

        const [data, total] = await this.satisfactionSurveyRepository.findAndCount({
            where: { userId, surveyType: SatisfactionSurveyType.SERVICE },
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