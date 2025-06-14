import { IQuery } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentDto } from "../dto/get-satisfaction-survey.dto";

export class GetSatisfactionSurveyTreatmentQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getSatisfactionSurveyTreatmentDto: GetSatisfactionSurveyTreatmentDto
    ) {}
}