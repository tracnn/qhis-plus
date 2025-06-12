import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Res, Query } from '@nestjs/common';
import { EmrRsModuleService } from './emr-rs-module.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetDocumentListByTreatmentIdDto } from './dto/get-document-list-by-treatment-id.dto';
import { GetDocumentByIdDto } from './dto/get-document-by-id.dto';
import { GetRelationListDto } from './dto/get-relation-list.dto';
import { TreatmentAccessGuard } from '../common/guards/treatment-access.guard';
import { DocumentAccessGuard } from 'src/common/guards/document-access.guard';

@ApiTags('EMR RS Module')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('emr-rs-module')
export class EmrRsModuleController {
  constructor(private readonly emrRsModuleService: EmrRsModuleService) {}

  @ApiOperation({ summary: 'Get document by treatment id' })
  @UseGuards(TreatmentAccessGuard)
  @Post('get-document-list-by-treatment-id')
  async getDocumentListByTreatmentId(@Body() body: GetDocumentListByTreatmentIdDto) {
    return this.emrRsModuleService.getDocumentListByTreatmentId(body);
  }

  @ApiOperation({ summary: 'Get document by id' }) 
  @UseGuards(DocumentAccessGuard)
  @Post('get-document-by-id')
  async getDocumentById(@Body() body: GetDocumentByIdDto) {
    return await this.emrRsModuleService.getDocumentById(body);
  }

  @ApiOperation({ summary: 'Get relation list' })
  @Post('get-relation-list')
  async getRelationList(@Body() body: GetRelationListDto) {
    return await this.emrRsModuleService.getRelationList(body);
  }
}
