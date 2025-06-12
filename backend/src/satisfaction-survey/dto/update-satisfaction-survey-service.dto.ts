import { PickType } from '@nestjs/swagger';
import { CreateSatisfactionSurveyServiceDto } from './create-satisfaction-survey-service.dto';

export class UpdateSatisfactionSurveyServiceDto extends PickType(CreateSatisfactionSurveyServiceDto, ['surveyScore', 'surveyComment']) {}
