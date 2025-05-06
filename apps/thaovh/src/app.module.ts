import { Module } from '@nestjs/common';
import { ThaovhController } from './presentation/controllers/thaovh.controller';
import { IThaovhUseCase } from './application/ports/inbound/thaovh.usecase.interface';
import { ThaovhUseCase } from './application/use-cases/thaovh.use-case';
import { ThaovhRepository } from './infrastructure/database/thaovh.repository';

@Module({
  controllers: [ThaovhController],
  providers: [
    {
      provide: 'IThaovhUseCase',
      useClass: ThaovhUseCase,
    },
    {
      provide: 'IThaovhRepository',
      useClass: ThaovhRepository,
    },
  ],
})
export class AppModule {} 
