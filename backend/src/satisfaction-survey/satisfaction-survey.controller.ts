import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { CreateSatisfactionSurveyDto } from './dto/create-satisfaction-survey.dto';
import { UpdateSatisfactionSurveyDto } from './dto/update-satisfaction-survey.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { GetSatisfactionSurveyTreatmentDto } from './dto/get-satisfaction-survey.dto';
import { GetSatisfactionSurveyTreatmentByTreatmentCodeDto } from './dto/get-satisfaction-survey-treatment-by-treatment-code.dto';

@ApiTags('Satisfaction Survey')
@Controller('satisfaction-survey')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class SatisfactionSurveyController {
  constructor(private readonly satisfactionSurveyService: SatisfactionSurveyService) {}

  @ApiOperation({ summary: 'Create a new satisfaction survey' })
  @ApiResponse({ status: 201, description: 'The satisfaction survey has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('treatment/create-survey')
  createTreatmentSurvey(@Req() req: any, @Body() createSatisfactionSurveyDto: CreateSatisfactionSurveyDto) {
    return this.satisfactionSurveyService.createTreatmentSurvey(req.user.userId, createSatisfactionSurveyDto);
  }

  @ApiOperation({ summary: 'Get all satisfaction surveys' })
  @ApiResponse({ status: 200, description: 'The satisfaction surveys have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('treatment/get-surveys')
  findAllTreatmentSurveys(@Req() req: any, @Query() getSatisfactionSurveyTreatmentDto: GetSatisfactionSurveyTreatmentDto) {
    return this.satisfactionSurveyService.findAllTreatmentSurveys(req.user.userId, getSatisfactionSurveyTreatmentDto);
  }

  @ApiOperation({ summary: 'Get a satisfaction survey by id' })
  @ApiResponse({ status: 200, description: 'The satisfaction survey has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('treatment/get-survey/:id')
  findOneTreatmentSurvey(@Req() req: any, @Param('id') satisfactionSurveyId: string) {
    return this.satisfactionSurveyService.findOneTreatmentSurvey(satisfactionSurveyId, req.user.userId);
  }

  @ApiOperation({ summary: 'Update a satisfaction survey' })
  @ApiResponse({ status: 200, description: 'The satisfaction survey has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Patch('treatment/update-survey/:id')
  updateTreatmentSurvey(@Req() req: any, @Param('id') satisfactionSurveyId: string, 
    @Body() updateSatisfactionSurveyDto: UpdateSatisfactionSurveyDto) 
  {
    return this.satisfactionSurveyService.updateTreatmentSurvey(satisfactionSurveyId, req.user.userId, updateSatisfactionSurveyDto);
  }

  @ApiOperation({ summary: 'Delete a satisfaction survey' })
  @ApiResponse({ status: 200, description: 'The satisfaction survey has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete('treatment/delete-survey/:id')
  deleteTreatmentSurvey(@Req() req: any, @Param('id') satisfactionSurveyId: string) {
    return this.satisfactionSurveyService.deleteTreatmentSurvey(req.user.userId, satisfactionSurveyId);
  }

  @ApiOperation({ summary: 'Get a satisfaction survey by treatment code' })
  @ApiResponse({ status: 200, description: 'The satisfaction survey has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('treatment/get-survey-by-treatment-code')
  findOneTreatmentSurveyByTreatmentCode(@Req() req: any, 
  @Query() getSatisfactionSurveyTreatmentByTreatmentCodeDto: GetSatisfactionSurveyTreatmentByTreatmentCodeDto) {
    return this.satisfactionSurveyService.findOneTreatmentSurveyByTreatmentCode(req.user.userId, 
      getSatisfactionSurveyTreatmentByTreatmentCodeDto);
  }

}
