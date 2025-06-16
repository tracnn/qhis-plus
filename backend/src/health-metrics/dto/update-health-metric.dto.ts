import { PickType } from '@nestjs/swagger';
import { CreatelHeathMetricDto } from './create-health-metric.dto';

export class UpdateHealthMetricDto extends PickType(CreatelHeathMetricDto, 
    ['pulse', 'systolic', 'diastolic', 'heightCm', 'weightKg', 'note', 'metricDate']) {}