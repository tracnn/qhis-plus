import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthInsuranceCard } from '../health-insurance-card.entity';

@Injectable()
export class HealthInsuranceCardRepository {
    constructor(
        @InjectRepository(HealthInsuranceCard)
        private readonly repository: Repository<HealthInsuranceCard>,
    ) {}

    async create(data: Partial<HealthInsuranceCard>): Promise<HealthInsuranceCard> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async findById(id: string): Promise<HealthInsuranceCard | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: string, data: Partial<HealthInsuranceCard>): Promise<HealthInsuranceCard | null> {
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }
} 