import { Module } from '@nestjs/common';
import { HisModuleService } from './his-module.service';
import { HisModuleController } from './his-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Career } from './entities/career.entity';
import { GetCareersHandler } from './queries/get-careers.handler';

@Module({  
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Career], 'HIS_RS'),
  ],
  controllers: [HisModuleController],
  providers: [HisModuleService,
    GetCareersHandler,
  ],
})
export class HisModuleModule {}
