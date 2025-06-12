import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BASE_SCHEMA } from '../constant/common.constant';

export const createTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  name: BASE_SCHEMA.DEFAULT,
  type: 'oracle',
  host: configService.get<string>('DB_HOST'),
  port: +(configService.get<string>('DB_PORT') || 1521),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  serviceName: configService.get<string>('DB_SERVICE_NAME'),
  autoLoadEntities: true,
  synchronize: false,
});

export const createSdaRsTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  name: BASE_SCHEMA.SDA_RS, // quan trọng: đặt tên cho connection này, không phải 'default'
  type: 'oracle', // hoặc 'mysql', 'postgres', ...
  host: configService.get<string>('SRS_DB_HOST'),
  port: +(configService.get<string>('SRS_DB_PORT') || 1521),
  username: configService.get<string>('SRS_DB_USERNAME'),
  password: configService.get<string>('SRS_DB_PASSWORD'),
  serviceName: configService.get<string>('SRS_DB_SERVICE_NAME'),
  //entities: [Province, District, ...], // hoặc
  //entities: [__dirname + '/../catalog/entities/*.entity.{ts,js}'],
  autoLoadEntities: true,
  synchronize: false,
});

export const createHisRsTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  name: BASE_SCHEMA.HIS_RS, // quan trọng: đặt tên cho connection này, không phải 'default'
  type: 'oracle', // hoặc 'mysql', 'postgres', ...
  host: configService.get<string>('HRS_DB_HOST'),
  port: +(configService.get<string>('HRS_DB_PORT') || 1521),
  username: configService.get<string>('HRS_DB_USERNAME'),
  password: configService.get<string>('HRS_DB_PASSWORD'),
  serviceName: configService.get<string>('HRS_DB_SERVICE_NAME'),
  autoLoadEntities: true,
  synchronize: false,
});

export const createEmRsTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  name: BASE_SCHEMA.EMR_RS, // quan trọng: đặt tên cho connection này, không phải 'default'
  type: 'oracle', // hoặc 'mysql', 'postgres', ...
  host: configService.get<string>('ERS_DB_HOST'),
  port: +(configService.get<string>('ERS_DB_PORT') || 1521),
  username: configService.get<string>('ERS_DB_USERNAME'),
  password: configService.get<string>('ERS_DB_PASSWORD'),
  //serviceName: configService.get<string>('ERS_DB_SERVICE_NAME'),
  sid: configService.get<string>('ERS_DB_SID'),
  autoLoadEntities: true,
  synchronize: false,
});

export const createAcsRsTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  name: BASE_SCHEMA.ACS_RS, // quan trọng: đặt tên cho connection này, không phải 'default'
  type: 'oracle', // hoặc 'mysql', 'postgres', ...
  host: configService.get<string>('ARS_DB_HOST'),
  port: +(configService.get<string>('ARS_DB_PORT') || 1521),
  username: configService.get<string>('ARS_DB_USERNAME'),
  password: configService.get<string>('ARS_DB_PASSWORD'),
  serviceName: configService.get<string>('ARS_DB_SERVICE_NAME'),
  //sid: configService.get<string>('ERS_DB_SID'),
  autoLoadEntities: true,
  synchronize: false,
});