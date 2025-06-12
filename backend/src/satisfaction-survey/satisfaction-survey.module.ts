import { Module } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { SatisfactionSurveyController } from './satisfaction-survey.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BASE_SCHEMA } from 'src/constant/common.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionSurvey } from './entities/satisfaction-survey.entity';
import { CreateSatisfactionSurveyTreatmentHandler } from './commands/create-satisfaction-survey-treatment.handler';
import { UpdateSatisfactionSurveyTreatmentHandler } from './commands/update-satisfaction-survey-treatment.handler';
import { GetSatisfactionSurveyTreatmentHandler } from './queries/get-satisfaction-survey-treatment.handler';
import { GetSatisfactionSurveyTreatmentByIdHandler } from './queries/get-satisfaction-survey-treatment-by-id.handler';
import { DeleteSatisfactionSurveyTreatmentHandler } from './commands/delete-satisfaction-survey-treatment.handler';
import { CreateSatisfactionSurveyServiceHandler } from './commands/create-satisfaction-survey-service.handler';
import { GetSatisfactionSurveyServiceHandler } from './queries/get-satisfaction-survey-service.handler';
import { GetSatisfactionSurveyServiceByIdHandler } from './queries/get-satisfaction-survey-service-by-id.handler';
import { UpdateSatisfactionSurveyServiceHandler } from './commands/update-satisfaction-survey-service.handler';
import { DeleteSatisfactionSurveyServiceHandler } from './commands/delete-satisfaction-survey-service.handler';

const CommandHandlers = [
  CreateSatisfactionSurveyTreatmentHandler,
  UpdateSatisfactionSurveyTreatmentHandler,
  DeleteSatisfactionSurveyTreatmentHandler,
  CreateSatisfactionSurveyServiceHandler,
  UpdateSatisfactionSurveyServiceHandler,
];

const QueryHandlers = [
  GetSatisfactionSurveyTreatmentHandler,
  GetSatisfactionSurveyTreatmentByIdHandler,
  GetSatisfactionSurveyServiceHandler,
  GetSatisfactionSurveyServiceByIdHandler,
  DeleteSatisfactionSurveyServiceHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([SatisfactionSurvey], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [SatisfactionSurveyController],
  providers: [SatisfactionSurveyService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class SatisfactionSurveyModule {}
