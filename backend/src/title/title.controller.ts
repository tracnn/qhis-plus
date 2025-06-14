import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TitleService } from './title.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { GetTitlesDto } from './dto/get-titles.dto';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @ApiOperation({ summary: 'Create title' })
  @ApiResponse({ status: 201, description: 'Create title successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titleService.create(createTitleDto);
  }

  @ApiOperation({ summary: 'Get titles' })
  @ApiResponse({ status: 200, description: 'Get titles successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get()
  findAll(@Query() getTitlesDto: GetTitlesDto) {
    return this.titleService.findAll(getTitlesDto);
  }

  @ApiOperation({ summary: 'Get title by id' })
  @ApiResponse({ status: 200, description: 'Get title by id successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(+id, updateTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titleService.remove(+id);
  }
}
