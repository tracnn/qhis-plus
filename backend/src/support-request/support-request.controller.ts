import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { UpdateSupportRequestDto } from './dto/update-support-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { GetSupportRequestsDto } from './dto/get-support-requests.dto';

@ApiTags('Support Request')
@Controller('support-request')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class SupportRequestController {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @ApiOperation({ summary: 'Create a new support request' })
  @ApiResponse({ status: 201, description: 'The support request has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Req() req: any, @Body() createSupportRequestDto: CreateSupportRequestDto) {
    return this.supportRequestService.create(req.user.userId, createSupportRequestDto);
  }

  @ApiOperation({ summary: 'Get all support requests' })
  @ApiResponse({ status: 200, description: 'The support requests have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get()
  findAll(@Req() req: any, @Query() getSupportRequestsDto: GetSupportRequestsDto) {
    return this.supportRequestService.findAll(req.user.userId, getSupportRequestsDto);
  }

  @ApiOperation({ summary: 'Get all support request types' })
  @ApiResponse({ status: 200, description: 'The support request types have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('types')
  getSupportRequestTypes() {
    return this.supportRequestService.getSupportRequestTypes();
  }

  @ApiOperation({ summary: 'Get a support request by id' })
  @ApiResponse({ status: 200, description: 'The support request has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.supportRequestService.findOne(req.user.userId, id);
  }

  @ApiOperation({ summary: 'Update a support request by id' })
  @ApiResponse({ status: 200, description: 'The support request has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateSupportRequestDto: UpdateSupportRequestDto) {
    return this.supportRequestService.update(req.user.userId, id, updateSupportRequestDto);
  }

  @ApiOperation({ summary: 'Delete a support request by id' })
  @ApiResponse({ status: 200, description: 'The support request has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.supportRequestService.remove(req.user.userId, id);
  }

}
