import { ICommandHandler } from "@nestjs/cqrs";
import { CreatePersonalHealthMetricCommand } from "./create-personal-health-metric.command";
import { CommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HealthMetric } from "../entities/health-metric.entity";
import { calculateBloodPressureStatus, calculateBMI, calculateBMIStatus } from "../utils/health-metrics.ultil";

@CommandHandler(CreatePersonalHealthMetricCommand)
export class CreatePersonalHealthMetricHandler implements ICommandHandler<CreatePersonalHealthMetricCommand> {
    constructor(
        @InjectRepository(HealthMetric)
        private readonly healthMetricRepository: Repository<HealthMetric>,
    ) {}

    async execute(command: CreatePersonalHealthMetricCommand): Promise<any> {
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
        healthMetric.bloodPressureStatus = calculateBloodPressureStatus(healthMetric.systolic, healthMetric.diastolic);

        return await this.healthMetricRepository.save(healthMetric);
    }
}