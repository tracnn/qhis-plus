import { ICommand } from "@nestjs/cqrs";
import { UpdateHealthMetricDto } from "../dto/update-health-metric.dto";

export class UpdateHealthMetricCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly metricId: string,
        public readonly updateHealthMetricDto: UpdateHealthMetricDto
    ) {}
}