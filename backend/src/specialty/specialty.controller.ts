import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { GetSpecialtiesDto } from './dto/get-specialties.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @ApiOperation({ summary: 'Create specialty' })
  @ApiResponse({ status: 201, description: 'Create specialty successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @ApiOperation({ summary: 'Get specialties' })
  @ApiResponse({ status: 200, description: 'Get specialties successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get()
  findAll(@Query() getSpecialtiesDto: GetSpecialtiesDto) {
    return this.specialtyService.findAll(getSpecialtiesDto);
  }

  @ApiOperation({ summary: 'Get specialty by id' })
  @ApiResponse({ status: 200, description: 'Get specialty by id successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialtyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyService.remove(+id);
  }
}
