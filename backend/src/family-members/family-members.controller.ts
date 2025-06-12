import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CanCreateFamilyMemberDto } from './dto/can-create-family-member.dto';

@ApiTags('Family Members')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('family-members')
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}


  @ApiOperation({ summary: 'Check if a family member can be created' })
  @ApiResponse({ status: 200, description: 'The family member can be created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('can-create')
  async canCreate(@Req() req: any, @Body() dto: CanCreateFamilyMemberDto) {
    return await this.familyMembersService.canCreate(req, dto);
  }

  @ApiOperation({ summary: 'Create a new family member' })
  @ApiResponse({ status: 201, description: 'The family member has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('create')
  async create(@Req() req: any, @Body() dto: CreateFamilyMemberDto) {
    return await this.familyMembersService.create(req.user.userId, dto);
  }


  @ApiOperation({ summary: 'Get all family members' })
  @ApiResponse({ status: 200, description: 'The family members have been successfully retrieved.' })
  @Get('all')
  findAll(@Req() req: any) {
    return this.familyMembersService.findAllByUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Get a family member by ID' })
  @ApiResponse({ status: 200, description: 'The family member has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.familyMembersService.findOne(req.user.userId, id);
  }

  @ApiOperation({ summary: 'Update a family member by ID' })
  @ApiResponse({ status: 200, description: 'The family member has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return this.familyMembersService.update(req.user.userId, id, updateFamilyMemberDto);
  }

  @ApiOperation({ summary: 'Delete a family member by ID' })
  @ApiResponse({ status: 200, description: 'The family member has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.familyMembersService.remove(req.user.userId, id);
  }
}
