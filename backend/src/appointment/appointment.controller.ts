import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentSlotDto } from './dto/create-appointment-slot.dto';
import { GetAppointmentSlotDto } from './dto/get-appointment-slot.dto';
import { GetAppointmentSlotBySpecialtyDto } from './dto/get-appointment-slot-by-specialty.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { GetAppointmentDto } from './dto/get-appointment.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Appointment')
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

  @ApiOperation({ summary: 'Get appointment slot by specialty' })
  @ApiResponse({ status: 200, description: 'The appointment slot has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('slot/specialty/:specialtyId')
  findSlotBySpecialty(@Param('specialtyId') specialtyId: string, @Query() dto: GetAppointmentSlotBySpecialtyDto) {
    return this.appointmentService.findSlotBySpecialty(specialtyId, dto);
  }

  @ApiOperation({ summary: 'Create appointment' })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('create')
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: any) {
    return this.appointmentService.createAppointment(req.user.userId, createAppointmentDto);
  }

  @ApiOperation({ summary: 'Get all appointment' })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('get-all')
  findAllAppointment(@Query() dto: GetAppointmentDto, @Req() req: any) {
    return this.appointmentService.findAllAppointment(req.user.userId, dto);
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
