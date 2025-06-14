import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClinicSpecialtyService } from './clinic-specialty.service';
import { CreateClinicSpecialtyDto } from './dto/create-clinic-specialty.dto';
import { UpdateClinicSpecialtyDto } from './dto/update-clinic-specialty.dto';
import { ApiOperation } from '@nestjs/swagger';
import { GetClinicSpecialtyDto } from './dto/get-clinic-specialty.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicSpecialtyDto: UpdateClinicSpecialtyDto) {
    return this.clinicSpecialtyService.update(+id, updateClinicSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicSpecialtyService.remove(+id);
  }
}
