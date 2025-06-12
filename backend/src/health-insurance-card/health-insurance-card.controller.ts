import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseInterceptors } from '@nestjs/common';
import { HealthInsuranceCardService } from './health-insurance-card.service';
import { CreateHealthInsuranceCardDto } from './dto/create-health-insurance-card.dto';
import { HealthInsuranceCard } from './health-insurance-card.entity';
import { CheckHealthInsuranceDto } from './dto/check-health-insurance.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Insurance Card')
@Controller('health-insurance-card')
export class HealthInsuranceCardController {
    constructor(
        private readonly service: HealthInsuranceCardService,
    ) { }

    @ApiOperation({ summary: 'Create health insurance card' })
    @Post()
    async create(@Body() dto: CreateHealthInsuranceCardDto): Promise<HealthInsuranceCard> {
        return await this.service.create(dto);
    }

    @ApiOperation({ summary: 'Get health insurance card by ID' })
    @Get(':id')
    async findById(@Param('id') id: string): Promise<HealthInsuranceCard | null> {
        return await this.service.findById(id);
    }

    @ApiOperation({ summary: 'Update health insurance card by ID' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: Partial<HealthInsuranceCard>,
    ): Promise<HealthInsuranceCard | null> {
        return await this.service.update(id, data);
    }

    @ApiOperation({ summary: 'Delete health insurance card by ID' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.service.delete(id);
    }

    @ApiOperation({ summary: 'Check health insurance card' })
    @Post('check')
    async check(@Body() params: CheckHealthInsuranceDto): Promise<any> {
        return await this.service.check(params);
    }
} 