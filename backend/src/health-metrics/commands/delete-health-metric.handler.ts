import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteHealthMetricCommand } from "./delete-health-metric.command";
import { HealthMetric } from "../entities/health-metric.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteHealthMetricCommand)
export class DeleteHealthMetricCommandHandler implements ICommandHandler<DeleteHealthMetricCommand> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>
    ) {}
    async execute(command: DeleteHealthMetricCommand): Promise<any> {
        const { userId, metricId } = command;
        const healthMetric = await this.healthMetricRepository.findOne({
            where: {
                id: metricId,
                userId: userId
            }
        });
        
        if (!healthMetric) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_HEALTH_METRIC);
        }

        return await this.healthMetricRepository.delete(metricId);
    }
}