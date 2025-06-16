import { CreatelHeathMetricDto } from "../dto/create-health-metric.dto";
import { ICommand } from "@nestjs/cqrs";

export class CreateHealthMetricCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly createPersonalHeathMetricDto: CreatelHeathMetricDto,
    ) {}
}