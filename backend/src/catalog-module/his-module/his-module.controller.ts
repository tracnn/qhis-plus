import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HisModuleService } from './his-module.service';
import { CreateHisModuleDto } from './dto/create-his-module.dto';
import { UpdateHisModuleDto } from './dto/update-his-module.dto';
import { GetCareersQuery } from './queries/get-careers.query';
import { GetCareersDto } from './dto/get-careers.dto';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('HIS Module')
@Controller('his-module')
export class HisModuleController {
  constructor(
    private readonly hisModuleService: HisModuleService,
    private readonly queryBus: QueryBus
  ) { }

  @ApiOperation({ summary: 'Get list of careers' })
  @Get('careers')
  async getCareers(@Query() dto: GetCareersDto) {
    return this.queryBus.execute(
      new GetCareersQuery(dto.page, dto.limit)
    );
  }

  // @Post()
  // create(@Body() createHisModuleDto: CreateHisModuleDto) {
  //   return this.hisModuleService.create(createHisModuleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.hisModuleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hisModuleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHisModuleDto: UpdateHisModuleDto) {
  //   return this.hisModuleService.update(+id, updateHisModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hisModuleService.remove(+id);
  // }
}
