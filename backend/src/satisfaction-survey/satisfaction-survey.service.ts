import { Injectable } from '@nestjs/common';
import { CreateSatisfactionSurveyDto } from './dto/create-satisfaction-survey.dto';
import { UpdateSatisfactionSurveyDto } from './dto/update-satisfaction-survey.dto';
import { CreateSatisfactionSurveyTreatmentCommand } from './commands/create-satisfaction-survey-treatment.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateSatisfactionSurveyTreatmentCommand } from './commands/update-satisfaction-survey-treatment.command';
import { GetSatisfactionSurveyTreatmentQuery } from './queries/get-satisfaction-survey-treatment.query';
import { GetSatisfactionSurveyTreatmentByIdQuery } from './queries/get-satisfaction-survey-treatment-by-id.query';
import { DeleteSatisfactionSurveyTreatmentCommand } from './commands/delete-satisfaction-survey-treatment.command';
import { CreateSatisfactionSurveyServiceDto } from './dto/create-satisfaction-survey-service.dto';
import { CreateSatisfactionSurveyServiceCommand } from './commands/create-satisfaction-survey-service.command';
import { GetSatisfactionSurveyServiceQuery } from './queries/get-satisfaction-survey-service.query';
import { GetSatisfactionSurveyServiceByIdQuery } from './queries/get-satisfaction-survey-service-by-id.query';
import { UpdateSatisfactionSurveyServiceDto } from './dto/update-satisfaction-survey-service.dto';
import { UpdateSatisfactionSurveyServiceCommand } from './commands/update-satisfaction-survey-service.command';
import { DeleteSatisfactionSurveyServiceCommand } from './commands/delete-satisfaction-survey-service.command';
import { GetSatisfactionSurveyTreatmentDto } from './dto/get-satisfaction-survey-treatment.dto';
import { GetSatisfactionSurveyServiceDto } from './dto/get-satisfaction-survey-service.dto';

@Injectable()
export class SatisfactionSurveyService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  createTreatmentSurvey(userId: string, createSatisfactionSurveyDto: CreateSatisfactionSurveyDto) {
    return this.commandBus.execute(new CreateSatisfactionSurveyTreatmentCommand(userId, createSatisfactionSurveyDto));
  }

  findAllTreatmentSurveys(userId: string, getSatisfactionSurveyTreatmentDto: GetSatisfactionSurveyTreatmentDto) {
    return this.queryBus.execute(new GetSatisfactionSurveyTreatmentQuery(userId, getSatisfactionSurveyTreatmentDto));
  }

  findOneTreatmentSurvey(satisfactionSurveyId: string, userId: string) {
    return this.queryBus.execute(new GetSatisfactionSurveyTreatmentByIdQuery(satisfactionSurveyId, userId));
  }

  updateTreatmentSurvey(satisfactionSurveyId: string, userId: string, updateSatisfactionSurveyDto: UpdateSatisfactionSurveyDto) {
    return this.commandBus.execute(new UpdateSatisfactionSurveyTreatmentCommand(
      satisfactionSurveyId, userId, updateSatisfactionSurveyDto));
  }

  deleteTreatmentSurvey(satisfactionSurveyId: string, userId: string) {
    return this.commandBus.execute(new DeleteSatisfactionSurveyTreatmentCommand(satisfactionSurveyId, userId));
  }

  createServiceSurvey(userId: string, createSatisfactionSurveyDto: CreateSatisfactionSurveyServiceDto) {
    return this.commandBus.execute(new CreateSatisfactionSurveyServiceCommand(userId, createSatisfactionSurveyDto));
  }

  findAllServiceSurveys(userId: string, getSatisfactionSurveyServiceDto: GetSatisfactionSurveyServiceDto) {
    return this.queryBus.execute(new GetSatisfactionSurveyServiceQuery(userId, getSatisfactionSurveyServiceDto));
  }

  findOneServiceSurvey(satisfactionSurveyId: string, userId: string) {
    return this.queryBus.execute(new GetSatisfactionSurveyServiceByIdQuery(satisfactionSurveyId, userId));
  }

  updateServiceSurvey(userId: string, satisfactionSurveyId: string, updateSatisfactionSurveyDto: UpdateSatisfactionSurveyServiceDto) {
    return this.commandBus.execute(new UpdateSatisfactionSurveyServiceCommand(userId, satisfactionSurveyId, updateSatisfactionSurveyDto));
  }

  deleteServiceSurvey(satisfactionSurveyId: string, userId: string) {
    return this.commandBus.execute(new DeleteSatisfactionSurveyServiceCommand(satisfactionSurveyId, userId));
  }
}
