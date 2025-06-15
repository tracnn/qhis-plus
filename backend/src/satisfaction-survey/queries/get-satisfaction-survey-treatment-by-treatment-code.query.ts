import { IQuery } from "@nestjs/cqrs";
import { GetSatisfactionSurveyTreatmentByTreatmentCodeDto } from "../dto/get-satisfaction-survey-treatment-by-treatment-code.dto";

export class GetSatisfactionSurveyTreatmentByTreatmentCodeQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly dto: GetSatisfactionSurveyTreatmentByTreatmentCodeDto,
    ) {}
}