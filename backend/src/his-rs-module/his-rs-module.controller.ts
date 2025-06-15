import { Controller, Get, Post, Body, UseGuards, Req, Query, Param } from '@nestjs/common';
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
import { GetClinicsDto } from './dto/get-clinics.dto';

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
  @Get('get-doctor')
  async getDoctors(@Query() query: GetDoctorsDto) {
    return this.hisRsModuleService.getDoctors(query);
  }

  @ApiOperation({ summary: 'Get doctor by id' })
  @Get('get-doctor/:id')
  async getDoctor(@Param('id') id: number) {
    return this.hisRsModuleService.getDoctor(+id);
  }

  @ApiOperation({ summary: 'Get doctors by ids' })
  @Get('get-doctors-by-ids/:ids')
  async getDoctorsByIds(@Param('ids') ids: string) {
    return this.hisRsModuleService.getDoctorsByIds(ids);
  }

  @ApiOperation({ summary: 'Get clinics' })
  @Get('get-clinic')
  async getClinics(@Query() query: GetClinicsDto) {
    return this.hisRsModuleService.getClinics(query);
  }

  @ApiOperation({ summary: 'Get clinic by id' })
  @Get('get-clinic/:id')
  async getClinic(@Param('id') id: number) {
    return this.hisRsModuleService.getClinic(+id);
  }
} 
  