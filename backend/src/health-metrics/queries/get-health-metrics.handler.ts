import { IQueryHandler } from "@nestjs/cqrs";
import { GetlHealthMetricsQuery } from "./get-health-metrics.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "../../common/pagination.util";
import { HealthMetric } from "../entities/health-metric.entity";

@QueryHandler(GetlHealthMetricsQuery)
export class GetlHealthMetricsHandler implements IQueryHandler<GetlHealthMetricsQuery> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>
    ) {}

    async execute(query: GetlHealthMetricsQuery): Promise<any> {
        const { userId, getlHealthMetricsDto } = query;
        const page = getlHealthMetricsDto.page && getlHealthMetricsDto.page > 0 ? getlHealthMetricsDto.page : PAGE_DEFAULT;
        const limit = getlHealthMetricsDto.limit && getlHealthMetricsDto.limit > 0 ? getlHealthMetricsDto.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;

        const whereClause = {
            userId,
            familyMemberId: getlHealthMetricsDto.familyMemberId || IsNull()
        };

        const [healthMetrics, total] = await this.healthMetricRepository.findAndCount({
            where: whereClause,
            skip: offset,
            take: limit
        });

        return {
            data: healthMetrics,
            pagination: buildPagination(page, limit, total)
        };
    }
}