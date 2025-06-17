import { ICommandHandler } from "@nestjs/cqrs";
import { CreateHealthMetricCommand } from "./create-health-metric.command";
import { CommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HealthMetric } from "../entities/health-metric.entity";
import { calculateBloodPressureStatus, calculateBloodPressureStatusNumber, calculateBMI, calculateBMIStatus } from "../utils/health-metrics.ultil";

@CommandHandler(CreateHealthMetricCommand)
export class CreateHealthMetricHandler implements ICommandHandler<CreateHealthMetricCommand> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>,
    ) {}

    async execute(command: CreateHealthMetricCommand): Promise<any> {
        const { userId, createPersonalHeathMetricDto } = command;

        const healthMetric = this.healthMetricRepository.create({
            userId,
            ...createPersonalHeathMetricDto,
        });

        //pre-calculate bmi
        healthMetric.bmi = calculateBMI(healthMetric.weightKg, healthMetric.heightCm);

        //pre-calculate bmi status
        healthMetric.bmiStatus = calculateBMIStatus(healthMetric.bmi);

        //pre-calculate blood pressure status
        healthMetric.bloodPressureStatus = calculateBloodPressureStatus(healthMetric.systolic, healthMetric.diastolic) || '';

        //pre-calculate blood pressure status number
        healthMetric.bloodPressureStatusNumber = calculateBloodPressureStatusNumber(healthMetric.bloodPressureStatus);

        return await this.healthMetricRepository.save(healthMetric);
    }
}