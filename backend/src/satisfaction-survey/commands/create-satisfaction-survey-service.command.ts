import { ICommand } from "@nestjs/cqrs";
import { CreateSatisfactionSurveyServiceDto } from "../dto/create-satisfaction-survey-service.dto";

export class CreateSatisfactionSurveyServiceCommand implements ICommand {
    constructor(public readonly userId: string, public readonly createSatisfactionSurveyDto: CreateSatisfactionSurveyServiceDto) {}
}