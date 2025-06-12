import { CreatePersonalHeathMetricDto } from "../dto/create-personal-heath-metric.dto";
import { ICommand } from "@nestjs/cqrs";

export class CreatePersonalHealthMetricCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly createPersonalHeathMetricDto: CreatePersonalHeathMetricDto,
    ) {}
}