import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SdaModuleService } from './sda-module.service';
import { CreateSdaModuleDto } from './dto/create-sda-module.dto';
import { UpdateSdaModuleDto } from './dto/update-sda-module.dto';
import { GetProvincesQuery } from './queries/get-provinces.query';
import { QueryBus } from '@nestjs/cqrs';
import { GetDistrictsQuery } from './queries/get-districts.query';
import { GetCommunesQuery } from './queries/get-communes.query';
import { GetSdaCommuneDto } from './dto/get-sda-commune.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetSdaProvinceDto } from './dto/get-sda-province.dto';
import { GetSdaDistrictDto } from './dto/get-sda-district.dto';
import { GetProvinceByIdQuery } from './queries/get-province-by-id.query';
import { GetProvinceByIdDto } from './dto/get-province-by-id.dto';
import { GetNationalsDto } from './dto/get-nationals.dto';
import { GetNationalsQuery } from './queries/get-nationals.query';
import { GetEthnicsDto } from './dto/get-ethnics.dto';
import { GetEthnicsQuery } from './queries/get-ethnics.query';

@ApiTags('SDA Module')
@Controller('sda-module')
export class SdaModuleController {
  constructor(private readonly sdaModuleService: SdaModuleService,
    private readonly queryBus: QueryBus,
  ) { }

  @ApiOperation({ summary: 'Get list of provinces' })
  @Get('provinces')
  async getProvinces(@Query() dto: GetSdaProvinceDto) {
    return await this.queryBus.execute(new GetProvincesQuery(dto.page, dto.limit));
  }

  @ApiOperation({ summary: 'Get list of districts' })
  @Get('districts')
  async getDistricts(@Query() dto: GetSdaDistrictDto) {
    return await this.queryBus.execute(new GetDistrictsQuery(dto.provinceId, dto.page, dto.limit));
  }

  @ApiOperation({ summary: 'Get list of communes' })
  @Get('communes')
  async getCommunes(@Query() dto: GetSdaCommuneDto) {
    return await this.queryBus.execute(new GetCommunesQuery(dto.districtId, dto.page, dto.limit));
  }

  @ApiOperation({ summary: 'Get province by id' })
  @Get('provinces/:id')
  async getProvinceById(@Param() dto: GetProvinceByIdDto) {
    return await this.queryBus.execute(new GetProvinceByIdQuery(dto));
  }

  @ApiOperation({ summary: 'Get nationals' })
  @Get('nationals')
  async getNationals(@Query() dto: GetNationalsDto) {
    return await this.queryBus.execute(new GetNationalsQuery(dto));
  }

  @ApiOperation({ summary: 'Get ethnics' })
  @Get('ethnics')
  async getEthnics(@Query() dto: GetEthnicsDto) {
    return await this.queryBus.execute(new GetEthnicsQuery(dto));
  }

  // @Post()
  // create(@Body() createSdaModuleDto: CreateSdaModuleDto) {
  //   return this.sdaModuleService.create(createSdaModuleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.sdaModuleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sdaModuleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSdaModuleDto: UpdateSdaModuleDto) {
  //   return this.sdaModuleService.update(+id, updateSdaModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sdaModuleService.remove(+id);
  // }
}
