import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DoctorTitleService } from './doctor-title.service';
import { CreateDoctorTitleDto } from './dto/create-doctor-title.dto';
import { UpdateDoctorTitleDto } from './dto/update-doctor-title.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { GetDoctorTitleDto } from './dto/get-doctor-title.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { GetDoctorTitleByTitleDto } from './dto/get-doctor-title-by-title.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Doctor Title')
@Controller('doctor-title')
export class DoctorTitleController {
  constructor(private readonly doctorTitleService: DoctorTitleService) {}

  @ApiOperation({ summary: 'Create a new doctor title' })
  @ApiResponse({ status: 201, description: 'The doctor title has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createDoctorTitleDto: CreateDoctorTitleDto) {
    return this.doctorTitleService.create(createDoctorTitleDto);
  }

  @ApiOperation({ summary: 'Get all doctor titles' })
  @ApiResponse({ status: 200, description: 'The doctor titles have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  findAll(@Query() getDoctorTitleDto: GetDoctorTitleDto) {
    return this.doctorTitleService.findAll(getDoctorTitleDto);
  }

  @ApiOperation({ summary: 'Get doctor title by id' })
  @ApiResponse({ status: 200, description: 'The doctor title has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorTitleService.findOne(id);
  }

  @ApiOperation({ summary: 'Get doctor title by title' })
  @ApiResponse({ status: 200, description: 'The doctor title has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('title/:titleId')
  findByTitle(@Query() getDoctorTitleByTitleDto: GetDoctorTitleByTitleDto) {
    return this.doctorTitleService.findByTitle(getDoctorTitleByTitleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorTitleDto: UpdateDoctorTitleDto) {
    return this.doctorTitleService.update(+id, updateDoctorTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorTitleService.remove(+id);
  }
}
