import { CreateFamilyHealthMetricDto } from "../dto/create-family-health-metric.dto";
import { ICommand } from "@nestjs/cqrs";

export class CreateFamilyHealthMetricCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly createFamilyHealthMetricDto: CreateFamilyHealthMetricDto,
    ) {}
}