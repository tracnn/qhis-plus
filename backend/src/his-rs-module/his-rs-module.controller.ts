import { Controller, Get, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { HisRsModuleService } from './his-rs-module.service';
import { GetHistoryByIdentityDto } from './dto/get-history-by-identity.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { GetServiceReqByTreatmentIdDto } from './dto/get-service-req-by-treatment-id.dto';
import { GetClinicalPrescriptionByTreatmentIdDto } from './dto/get-clinical-prescription-by-treatment-id.dto';
import { GetMedicalExpensesByTreatmentIdDto } from './dto/get-medical-expenses-by-treatment-id.dto';
import { TreatmentAccessGuard } from '../common/guards/treatment-access.guard';
import { GetPacsLinkByTreatmentIdDto } from './dto/get-pacs-link-by-treatment-id.dto';
import { IdentityAccessGuard } from '../common/guards/identity-access.guard';
import { GetPatientTypesDto } from './dto/get-patient-types.dto';
import { GetBranchDto } from './dto/get-branch.dto';
import { GetDoctorsDto } from './dto/get-doctors.dto';
import { GetExamRoomsDto } from './dto/get-exam-rooms.dto';

@ApiTags('HIS RS Module')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('his-rs-module')
export class HisRsModuleController {
  constructor(private readonly hisRsModuleService: HisRsModuleService) {  }

  @ApiOperation({ summary: 'Get history by identity' })
  @UseGuards(IdentityAccessGuard)
  @Post('get-history-by-identity')
  async getHistoryByIdentity(@Body() body: GetHistoryByIdentityDto) {
    return this.hisRsModuleService.getHistoryByIdentity(body);
  }

  @ApiOperation({ summary: 'Get service req by treatment id' })
  @UseGuards(TreatmentAccessGuard)
  @Post('get-service-req-by-treatment-id')
  async getServiceReqByTreatmentId(@Body() body: GetServiceReqByTreatmentIdDto) {
    return this.hisRsModuleService.getServiceReqByTreatmentId(body);
  }

  @ApiOperation({ summary: 'Get clinical prescription by treatment id' })
  @UseGuards(TreatmentAccessGuard)
  @Post('get-clinical-prescription-by-treatment-id')
  async getClinicalPrescriptionByTreatmentId(@Body() body: GetClinicalPrescriptionByTreatmentIdDto) {
    return this.hisRsModuleService.getClinicalPrescriptionByTreatmentId(body);
  }

  @ApiOperation({ summary: 'Get medical expenses by treatment id' })
  @UseGuards(TreatmentAccessGuard)
  @Post('get-medical-expenses-by-treatment-id')
  async getMedicalExpensesByTreatmentId(@Body() body: GetMedicalExpensesByTreatmentIdDto) {
    return this.hisRsModuleService.getMedicalExpensesByTreatmentId(body);
  }

  @ApiOperation({ summary: 'Get pacs link by treatment id' })
  @UseGuards(TreatmentAccessGuard)
  @Post('get-pacs-link-by-treatment-id')
  async getPacsLinkByTreatmentId(@Body() body: GetPacsLinkByTreatmentIdDto) {
    return this.hisRsModuleService.getPacsLinkByTreatmentId(body);
  }

  @ApiOperation({ summary: 'Get patient types' })
  @Get('get-patient-types')
  async getPatientTypes(@Query() query: GetPatientTypesDto) {
    return this.hisRsModuleService.getPatientTypes(query);
  }

  @ApiOperation({ summary: 'Get branch' })
  @Get('get-branch')
  async getBranch(@Query() query: GetBranchDto) {
    return this.hisRsModuleService.getBranch(query);
  }

  @ApiOperation({ summary: 'Get doctors' })
  @Get('get-doctors')
  async getDoctors(@Query() query: GetDoctorsDto) {
    return this.hisRsModuleService.getDoctors(query);
  }

  @ApiOperation({ summary: 'Get exam rooms' })
  @Get('get-exam-rooms')
  async getExamRooms(@Query() query: GetExamRoomsDto) {
    return this.hisRsModuleService.getExamRooms(query);
  }
} 
  