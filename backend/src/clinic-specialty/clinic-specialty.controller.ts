import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClinicSpecialtyService } from './clinic-specialty.service';
import { CreateClinicSpecialtyDto } from './dto/create-clinic-specialty.dto';
import { UpdateClinicSpecialtyDto } from './dto/update-clinic-specialty.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetClinicSpecialtyDto } from './dto/get-clinic-specialty.dto';
import { GetClinicSpecialtyBySpecialtyIdDto } from './dto/get-clinic-specialty-by-specialty-id.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Clinic Specialty')
@Controller('clinic-specialty')
export class ClinicSpecialtyController {
  constructor(private readonly clinicSpecialtyService: ClinicSpecialtyService) {}

  @ApiOperation({ summary: 'Create clinic specialty' })
  @Post()
  create(@Body() createClinicSpecialtyDto: CreateClinicSpecialtyDto) {
    return this.clinicSpecialtyService.create(createClinicSpecialtyDto);
  }

  @ApiOperation({ summary: 'Get all clinic specialties' })
  @Get()
  findAll(@Query() dto: GetClinicSpecialtyDto) {
    return this.clinicSpecialtyService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get clinic specialty by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicSpecialtyService.findOne(id);
  }

  @ApiOperation({ summary: 'Get clinic specialty by specialty id' })
  @Get('specialty/:specialtyId')
  getBySpecialtyId(@Param('specialtyId') specialtyId: string, @Query() dto: GetClinicSpecialtyBySpecialtyIdDto) {
    return this.clinicSpecialtyService.getBySpecialtyId(specialtyId, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicSpecialtyDto: UpdateClinicSpecialtyDto) {
    return this.clinicSpecialtyService.update(+id, updateClinicSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicSpecialtyService.remove(+id);
  }
}
