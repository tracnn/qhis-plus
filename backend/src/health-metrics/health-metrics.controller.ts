import { Controller, Get, Post, Body, Req, Query, Patch, Param, Delete } from '@nestjs/common';
import { HealthMetricsService } from './health-metrics.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreatelHeathMetricDto } from './dto/create-health-metric.dto';
import { GetlHealthMetricsDto } from './dto/get-health-metrics.dto';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';

@ApiTags('Health Metrics')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('health-metrics')
export class HealthMetricsController {
  constructor(private readonly healthMetricsService: HealthMetricsService) {}

  @ApiOperation({ summary: 'Create a new personal health metric' })
  @ApiResponse({ status: 201, description: 'The health metric has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  createHealthMetric(@Req() req: any, @Body() createHealthMetricDto: CreatelHeathMetricDto) {
    return this.healthMetricsService.createHealthMetric(req.user.userId, createHealthMetricDto);
  }

  @ApiOperation({ summary: 'Get all health metrics' })
  @ApiResponse({ status: 200, description: 'The health metrics have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  findAlllHealthMetrics(@Req() req: any, @Query() getlHealthMetricsDto: GetlHealthMetricsDto) {
    return this.healthMetricsService.findAlllHealthMetrics(req.user.userId, getlHealthMetricsDto);
  }

  @ApiOperation({ summary: 'Get a health metric by id' })
  @ApiResponse({ status: 200, description: 'The health metric has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  getHealthMetricById(@Req() req: any, @Param('id') metricId: string) {
    return this.healthMetricsService.getHealthMetricById(req.user.userId, metricId);
  }

  @ApiOperation({ summary: 'Update a health metric' })
  @ApiResponse({ status: 200, description: 'The health metric has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Patch(':id')
  updateHealthMetric(@Req() req: any, @Param('id') metricId: string, @Body() updateHealthMetricDto: UpdateHealthMetricDto) {
    return this.healthMetricsService.updateHealthMetric(req.user.userId, metricId, updateHealthMetricDto);
  }

  @ApiOperation({ summary: 'Delete a health metric' })
  @ApiResponse({ status: 200, description: 'The health metric has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  deleteHealthMetric(@Req() req: any, @Param('id') metricId: string) {
    return this.healthMetricsService.deleteHealthMetric(req.user.userId, metricId);
  }
}
