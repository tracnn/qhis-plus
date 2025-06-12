import { ICommand } from "@nestjs/cqrs";

export class DeleteHealthMetricCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly metricId: string
    ) {}
}