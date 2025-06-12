import { BadRequestException, Injectable } from '@nestjs/common';
import { HealthInsuranceCardRepository } from './repository/health-insurance-card.repository';
import { CreateHealthInsuranceCardDto } from './dto/create-health-insurance-card.dto';
import { HealthInsuranceCard } from './health-insurance-card.entity';
import { CheckHealthInsuranceDto } from './dto/check-health-insurance.dto';
import { ApiBhxhService } from './services/api.bhxh.service';
import { ERRORS } from '../common/errors.config';
import { ERROR_CODE } from '../constant/bhxh.constant';

@Injectable()
export class HealthInsuranceCardService {
    constructor(
        private readonly repository: HealthInsuranceCardRepository,
        private readonly apiBhxhService: ApiBhxhService,
    ) {}

    async create(dto: CreateHealthInsuranceCardDto): Promise<HealthInsuranceCard> {
        return await this.repository.create(dto);
    }

    async findById(id: string): Promise<HealthInsuranceCard | null> {
        return await this.repository.findById(id);
    }

    async update(id: string, data: Partial<HealthInsuranceCard>): Promise<HealthInsuranceCard | null> {
        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async check(params: CheckHealthInsuranceDto): Promise<any> {
        const result = await this.apiBhxhService.check(params);
        if (result.resultCode in ERROR_CODE) {
            throw new BadRequestException(ERROR_CODE[result.resultCode as keyof typeof ERROR_CODE]);
        } else {
            return result;
        }
    }
} 