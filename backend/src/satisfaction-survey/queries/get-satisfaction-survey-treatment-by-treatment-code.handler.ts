import { IQueryHandler } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentByTreatmentCodeQuery } from "./get-satisfaction-survey-treatment-by-treatment-code.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
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
        
        // Xử lý serviceReqCode rõ ràng hơn
        if (typeof serviceReqCode === 'string' && serviceReqCode.trim() !== "") {
            whereCondition.serviceReqCode = serviceReqCode.trim();
        } else {
            whereCondition.serviceReqCode = IsNull();
        }
        
        const result = await this.satisfactionSurveyRepository.findOne({
            where: whereCondition,
        });
        
        return result ? [result] : [];
    }
}