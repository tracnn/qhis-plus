import { Module } from '@nestjs/common';
import { TracnnController } from './presentation/controllers/tracnn.controller';
import { ITracnnUseCase } from './application/ports/inbound/tracnn.usecase.interface';
import { TracnnUseCase } from './application/use-cases/tracnn.use-case';
import { TracnnRepository } from './infrastructure/database/tracnn.repository';

@Module({
  controllers: [TracnnController],
  providers: [
    {
      provide: 'ITracnnUseCase',
      useClass: TracnnUseCase,
    },
    {
      provide: 'ITracnnRepository',
      useClass: TracnnRepository,
    },
  ],
})
export class AppModule {} 