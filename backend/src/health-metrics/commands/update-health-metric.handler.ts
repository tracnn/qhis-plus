import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateHealthMetricCommand } from "./update-health-metric.command";
import { InjectRepository } from "@nestjs/typeorm";
import { HealthMetric } from "../entities/health-metric.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { calculateBMI, calculateBMIStatus, calculateBloodPressureStatus } from "../utils/health-metrics.ultil";

@CommandHandler(UpdateHealthMetricCommand)
export class UpdateHealthMetricCommandHandler implements ICommandHandler<UpdateHealthMetricCommand> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>
    ) {}
    async execute(command: UpdateHealthMetricCommand): Promise<any> {
        const { userId, metricId, updateHealthMetricDto } = command;
        const healthMetric = await this.healthMetricRepository.findOne({
            where: {
                id: metricId,
                userId: userId
            }
        });
        
        if (!healthMetric) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_HEALTH_METRIC);
        }

        //pre-calculate bmi
        const bmi = calculateBMI(updateHealthMetricDto.weightKg, updateHealthMetricDto.heightCm);

        //pre-calculate bmi status
        const bmiStatus = calculateBMIStatus(bmi);

        //pre-calculate blood pressure status
        const bloodPressureStatus = calculateBloodPressureStatus(updateHealthMetricDto.systolic, updateHealthMetricDto.diastolic);

        const updatedHealthMetric = await this.healthMetricRepository.update(metricId, {
            ...updateHealthMetricDto,
            bmi,
            bmiStatus,
            bloodPressureStatus,
            updatedAt: new Date(),
            updatedBy: userId
        });
        if (updatedHealthMetric.affected === 0) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_HEALTH_METRIC);
        }

        return updatedHealthMetric;
    }
}