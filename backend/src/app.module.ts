import 'dotenv/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { WinstonModule } from 'nest-winston';
import { createWinstonLoggerOptions } from './common/winston.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { createSdaRsTypeOrmConfig, createTypeOrmConfig, 
  createHisRsTypeOrmConfig, createEmRsTypeOrmConfig, createAcsRsTypeOrmConfig } from './config/typeorm.config';
import { HealthInsuranceCardModule } from './health-insurance-card/health-insurance-card.module';
import { OtpModule } from './otp/otp.module';
import { SdaModuleModule } from './catalog-module/sda-module/sda-module.module';
import { HisModuleModule } from './catalog-module/his-module/his-module.module';
import { ZaloService } from './otp/services/zalo.service';
import { HttpModule } from '@nestjs/axios';
import { BASE_SCHEMA } from './constant/common.constant';
import { ZaloModule } from './zalo/zalo.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { HisRsModuleModule } from './his-rs-module/his-rs-module.module';
import { EmrRsModuleModule } from './emr-rs-module/emr-rs-module.module';
import { FtpModule } from './ftp/ftp.module';
import { MinioModule } from './minio/minio.module';
import { OrganizationConfigService } from './common/organization-config.service';
import { SupportRequestModule } from './support-request/support-request.module';
import { SatisfactionSurveyModule } from './satisfaction-survey/satisfaction-survey.module';
import { HealthMetricsModule } from './health-metrics/health-metrics.module';
import { AcsModuleModule } from './catalog-module/acs-module/acs-module.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { TitleModule } from './title/title.module';
import { ClinicSpecialtyModule } from './clinic-specialty/clinic-specialty.module';
import { DoctorTitleModule } from './doctor-title/doctor-title.module';
import { SmsModule } from './sms/sms.module';
import { Qd3176Module } from './bhxh/qd3176/qd3176.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => createTypeOrmConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      name: BASE_SCHEMA.SDA_RS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => createSdaRsTypeOrmConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      name: BASE_SCHEMA.HIS_RS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => createHisRsTypeOrmConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      name: BASE_SCHEMA.EMR_RS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => createEmRsTypeOrmConfig(configService),
    }),
    TypeOrmModule.forRootAsync({
      name: BASE_SCHEMA.ACS_RS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => createAcsRsTypeOrmConfig(configService),
    }),
    CqrsModule,
    WinstonModule.forRoot(createWinstonLoggerOptions()),
    PatientModule,
    UserModule,
    AuthModule,
    HealthInsuranceCardModule,
    OtpModule,
    SdaModuleModule,
    HisModuleModule,
    HttpModule,
    ZaloModule,
    SmsModule,
    FamilyMembersModule,
    HisRsModuleModule,
    EmrRsModuleModule,
    FtpModule,
    MinioModule,
    SupportRequestModule,
    SatisfactionSurveyModule,
    HealthMetricsModule,
    AcsModuleModule,
    AdminAuthModule,
    AppointmentModule,
    SpecialtyModule,
    TitleModule,
    ClinicSpecialtyModule,
    DoctorTitleModule,
    Qd3176Module,
  ],
  controllers: [AppController],
  providers: [AppService, ZaloService, OrganizationConfigService],
  exports: [OrganizationConfigService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
