import { GetlHealthMetricsDto } from "../dto/get-health-metrics.dto";
import { IQuery } from "@nestjs/cqrs";

export class GetlHealthMetricsQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getlHealthMetricsDto: GetlHealthMetricsDto,
    ) {}
}