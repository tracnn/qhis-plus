import { IQuery } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentByTreatmentCodeDto } from "../dto/get-satisfaction-survey-by-treatment.dto";

export class GetSatisfactionSurveyTreatmentByTreatmentCodeQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly dto: GetSatisfactionSurveyTreatmentByTreatmentCodeDto,
    ) {}
}