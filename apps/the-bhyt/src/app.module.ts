import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheBhytController } from './presentation/controllers/the-bhyt.controller';
import { TheBhytUseCase } from './application/use-cases/the-bhyt.use-case';
import { BhxhAuthService } from './infrastructure/external/bhxh/auth.service';
import { BhxhApiService } from './infrastructure/external/bhxh/bhxh-api.service';
import { TheBhytValidatorService } from './domain/services/the-bhyt-validator.service';
import { CheckHeinCardModel } from './infrastructure/database/models/check-hein-card.model';
import { CheckHeinCardRepository } from './infrastructure/repositories/check-hein-card.repository';
import { CheckHeinCardService } from './domain/services/check-hein-card.service';
import { CheckHeinCardValidatorService } from './application/services/check-hein-card-validator.service';
import { databaseConfig } from './infrastructure/config/database.config';
import { IBhxhAuthService } from './domain/interfaces/bhxh-auth.service.interface';
import { ITheBhytValidator } from './domain/interfaces/the-bhyt-validator.interface';
import { ValidationExceptionFilter } from './presentation/filters/validation-exception.filter';
import { ITheBhytRepository } from './domain/interfaces/the-bhyt.repository.interface';
import { TheBhytService } from './infrastructure/external/bhxh/the-bhyt.service';
import { CheckHeinCardDomainValidator } from './domain/services/check-hein-card-validator.service';
import { CheckHeinCardController } from './presentation/controllers/check-hein-card.controller';
import { CheckHeinCardQueryService } from './application/services/check-hein-card-query.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([CheckHeinCardModel]),
  ],
  controllers: [TheBhytController, CheckHeinCardController],
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
      useClass: TheBhytService,
    },
    {
      provide: 'ICheckHeinCardRepository',
      useClass: CheckHeinCardRepository,
    },
    {
      provide: 'ICheckHeinCardService',
      useClass: CheckHeinCardService,
    },
    {
      provide: 'ICheckHeinCardDomainValidator',
      useClass: CheckHeinCardDomainValidator,
    },
    CheckHeinCardQueryService,
  ],
})
export class AppModule {} 
