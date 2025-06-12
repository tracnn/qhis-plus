import { ICommandHandler } from "@nestjs/cqrs";
import { CommandHandler } from "@nestjs/cqrs";
import { CreateFamilyHealthMetricCommand } from "./create-family-health-metric.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HealthMetric } from "../entities/health-metric.entity";
import { calculateBloodPressureStatus, calculateBMI, calculateBMIStatus } from "../utils/health-metrics.ultil";

@CommandHandler(CreateFamilyHealthMetricCommand)
export class CreateFamilyHealthMetricHandler implements ICommandHandler<CreateFamilyHealthMetricCommand> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>,
    ) {}

    async execute(command: CreateFamilyHealthMetricCommand): Promise<any> {
        const { userId, createFamilyHealthMetricDto } = command;

        const healthMetric = this.healthMetricRepository.create({
            userId,
            ...createFamilyHealthMetricDto,
        });

        //pre-calculate bmi
        healthMetric.bmi = calculateBMI(healthMetric.weightKg, healthMetric.heightCm);

        //pre-calculate bmi status
        healthMetric.bmiStatus = calculateBMIStatus(healthMetric.bmi);

        //pre-calculate blood pressure status
        healthMetric.bloodPressureStatus = calculateBloodPressureStatus(healthMetric.systolic, healthMetric.diastolic);

        return await this.healthMetricRepository.save(healthMetric);
    }
}