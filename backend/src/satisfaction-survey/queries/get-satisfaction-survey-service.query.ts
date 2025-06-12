import { IQuery } from "@nestjs/cqrs";
import { GetSatisfactionSurveyServiceDto } from "../dto/get-satisfaction-survey-service.dto";

export class GetSatisfactionSurveyServiceQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getSatisfactionSurveyServiceDto: GetSatisfactionSurveyServiceDto
    ) {}
}