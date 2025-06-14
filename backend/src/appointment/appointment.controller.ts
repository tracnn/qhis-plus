import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAppointmentSlotDto } from './dto/create-appointment-slot.dto';
import { GetAppointmentSlotDto } from './dto/get-appointment-slot.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'Create appointment slot' })
  @ApiResponse({ status: 200, description: 'The appointment slot has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('slot')
  createSlot(@Body() createAppointmentSlotDto: CreateAppointmentSlotDto) {
    return this.appointmentService.createSlot(createAppointmentSlotDto);
  }

  @ApiOperation({ summary: 'Get slot time' })
  @ApiResponse({ status: 200, description: 'The slot time has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('slot-time')
  getSlotTime() {
    return this.appointmentService.getSlotTime();
  }

  @ApiOperation({ summary: 'Get slot type' })
  @ApiResponse({ status: 200, description: 'The slot type has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('slot-type')
  getSlotType() {
    return this.appointmentService.getSlotType();
  }

  @ApiOperation({ summary: 'Get all appointment slot' })
  @ApiResponse({ status: 200, description: 'The appointment slot has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('slot')
  findAllSlot(@Query() getAppointmentSlotDto: GetAppointmentSlotDto) {
    return this.appointmentService.findAllSlot(getAppointmentSlotDto);
  }

  @ApiOperation({ summary: 'Get appointment slot by id' })
  @ApiResponse({ status: 200, description: 'The appointment slot has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('slot/:id')
  findOneSlot(@Param('id') id: string) {
    return this.appointmentService.findOneSlot(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }

}
