import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheBhytController } from './presentation/controllers/the-bhyt.controller';
import { TheBhytUseCase } from './application/use-cases/the-bhyt.use-case';
import { TheBhytRepository } from './infrastructure/database/the-bhyt.repository';
import { BhxhAuthService } from './infrastructure/services/bhxh-auth.service';
import { BhxhApiService } from './infrastructure/external/bhxh-api.service';
import { TheBhytValidatorService } from './domain/services/the-bhyt-validator.service';
import { CheckHeinCard } from './domain/entities/check-hein-card.entity';
import { CheckHeinCardRepository } from './infrastructure/database/check-hein-card.repository';
import { CheckHeinCardService } from './domain/services/check-hein-card.service';
import { CheckHeinCardValidatorService } from './domain/services/check-hein-card-validator.service';
import { databaseConfig } from './infrastructure/config/database.config';
import { IBhxhAuthService } from './infrastructure/interfaces/bhxh-auth.service.interface';
import { ITheBhytValidator } from './domain/interfaces/the-bhyt-validator.interface';
import { ValidationExceptionFilter } from './presentation/filters/validation-exception.filter';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([CheckHeinCard]),
  ],
  controllers: [TheBhytController],
  providers: [
    {
      provide: 'ITheBhytUseCase',
      useClass: TheBhytUseCase,
    },
    {
      provide: 'IBhxhAuthService',
      useClass: BhxhAuthService,
    },
    {
      provide: 'ITheBhytValidator',
      useClass: TheBhytValidatorService,
    },
    TheBhytValidatorService,
    CheckHeinCardValidatorService,
    BhxhApiService,
    {
      provide: 'ITheBhytRepository',
      useClass: TheBhytRepository,
    },
    {
      provide: 'ICheckHeinCardRepository',
      useClass: CheckHeinCardRepository,
    },
    {
      provide: 'ICheckHeinCardService',
      useClass: CheckHeinCardService,
    },
  ],
})
export class AppModule {} 
