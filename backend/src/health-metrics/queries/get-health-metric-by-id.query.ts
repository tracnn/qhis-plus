import { IQuery } from "@nestjs/cqrs";

export class GetHealthMetricByIdQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly metricId: string
    ) {}
}