import { PickType } from '@nestjs/swagger';
import { CreatePersonalHeathMetricDto } from './create-personal-heath-metric.dto';

export class UpdateHealthMetricDto extends PickType(CreatePersonalHeathMetricDto, 
    ['pulse', 'systolic', 'diastolic', 'heightCm', 'weightKg', 'note', 'metricDate']) {}