import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHealthMetricByIdQuery } from "./get-health-metric-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HealthMetric } from "../entities/health-metric.entity";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetHealthMetricByIdQuery)
export class GetHealthMetricByIdQueryHandler implements IQueryHandler<GetHealthMetricByIdQuery> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>
    ) {}
    async execute(query: GetHealthMetricByIdQuery): Promise<any> {
        const { userId, metricId } = query;
        const healthMetric = await this.healthMetricRepository.findOne({
            where: {
                id: metricId,
                userId: userId
            }
        });
        
        if (!healthMetric) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_HEALTH_METRIC);
        }

        return healthMetric;
    }
}   