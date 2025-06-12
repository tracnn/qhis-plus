import { Module } from '@nestjs/common';
import { SdaModuleService } from './sda-module.service';
import { SdaModuleController } from './sda-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Province } from './entities/province.entity';
import { GetProvincesHandler } from './queries/get-provinces.handler';
import { District } from './entities/district.entity';
import { GetDistrictsHandler } from './queries/get-districts.handler';
import { GetCommunesHandler } from './queries/get-communes.handler';
import { registerExtendedRepo } from '../../common/base.repository.provider';
import { ProvinceRepository } from './repositories/province.repository';
import { BASE_SCHEMA } from '../../constant/common.constant';
import { DistrictRepository } from './repositories/district.repository';
import { CommuneRepository } from './repositories/commune.repository';
import { Commune } from './entities/commune.entity';
import { GetAllProvincesHandler } from './queries/get-all-provinces.handler';
import { GetDistrictsByProvinceIdHandler } from './queries/get-districts-by-province-id.handler';
import { GetCommunesByDistrictIdHandler } from './queries/get-communes-by-district-id.handler';
import { GetProvinceByIdHandler } from './queries/get-province-by-id.handler';
import { GetNationalsHandler } from './queries/get-nationals.handler';
import { GetEthnicsHandler } from './queries/get-ethnics.handler';
import { National } from './entities/national.entity';
import { Ethnic } from './entities/ethnic.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Province, District, Commune, National, Ethnic], BASE_SCHEMA.SDA_RS), // chú ý connection name!
  ],
  controllers: [SdaModuleController,
  ],
  providers: [SdaModuleService,
    GetProvincesHandler,
    GetDistrictsHandler,
    GetCommunesHandler,
    registerExtendedRepo(Province, ProvinceRepository, 'ProvinceRepository', BASE_SCHEMA.SDA_RS),
    registerExtendedRepo(District, DistrictRepository, 'DistrictRepository', BASE_SCHEMA.SDA_RS),
    registerExtendedRepo(Commune, CommuneRepository, 'CommuneRepository', BASE_SCHEMA.SDA_RS),
    GetAllProvincesHandler,
    GetDistrictsByProvinceIdHandler,
    GetCommunesByDistrictIdHandler,
    GetProvinceByIdHandler,
    GetNationalsHandler,
    GetEthnicsHandler,
  ],
  exports: [CqrsModule],
})
export class SdaModuleModule {}
