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

        const { treatmentCode, serviceReqCode } = dto;

        const whereCondition: any = {
            userId,
            treatmentCode,
        };
    
        if (serviceReqCode) {
            whereCondition.serviceReqCode = serviceReqCode;
        } else {
            whereCondition.serviceReqCode = null;
        }
    
        const satisfactionSurvey = await this.satisfactionSurveyRepository.findOne({
            where: whereCondition,
        });

        if (!satisfactionSurvey) {
            return [];
        }

        return satisfactionSurvey;
    }
}