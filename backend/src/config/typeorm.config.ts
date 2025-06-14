import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BASE_SCHEMA } from '../constant/common.constant';
import { buildOracleConnectString } from './build-oracle-connection-string.config';

export const createTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('DB_HOST') || 'localhost';
  const port = configService.get<string>('DB_PORT') || '1521';
  const sid = configService.get<string>('DB_SID');
  const serviceName = configService.get<string>('DB_SERVICE_NAME');

  return {
    name: BASE_SCHEMA.DEFAULT,
    type: 'oracle',
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    connectString: buildOracleConnectString(host, port, sid, serviceName),
    autoLoadEntities: true,
    synchronize: false,
  };
};

export const createSdaRsTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('SRS_DB_HOST') || 'localhost';
  const port = configService.get<string>('SRS_DB_PORT') || '1521';
  const sid = configService.get<string>('SRS_DB_SID');
  const serviceName = configService.get<string>('SRS_DB_SERVICE_NAME');

  return {
    name: BASE_SCHEMA.SDA_RS,
    type: 'oracle',
    username: configService.get<string>('SRS_DB_USERNAME'),
    password: configService.get<string>('SRS_DB_PASSWORD'),
    connectString: buildOracleConnectString(host, port, sid, serviceName),
    autoLoadEntities: true,
    synchronize: false,
  };
};

export const createHisRsTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('HRS_DB_HOST') || 'localhost';
  const port = configService.get<string>('HRS_DB_PORT') || '1521';
  const sid = configService.get<string>('HRS_DB_SID');
  const serviceName = configService.get<string>('HRS_DB_SERVICE_NAME');

  return {
    name: BASE_SCHEMA.HIS_RS,
    type: 'oracle',
    username: configService.get<string>('HRS_DB_USERNAME'),
    password: configService.get<string>('HRS_DB_PASSWORD'),
    connectString: buildOracleConnectString(host, port, sid, serviceName),
    autoLoadEntities: true,
    synchronize: false,
  };
};

// EMR_RS
export const createEmRsTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('ERS_DB_HOST') || 'localhost';
  const port = configService.get<string>('ERS_DB_PORT') || '1521';
  const sid = configService.get<string>('ERS_DB_SID');
  const serviceName = configService.get<string>('ERS_DB_SERVICE_NAME');

  return {
    name: BASE_SCHEMA.EMR_RS,
    type: 'oracle',
    username: configService.get<string>('ERS_DB_USERNAME'),
    password: configService.get<string>('ERS_DB_PASSWORD'),
    connectString: buildOracleConnectString(host, port, sid, serviceName),
    autoLoadEntities: true,
    synchronize: false,
  };
};

// ACS_RS
export const createAcsRsTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('ARS_DB_HOST') || 'localhost';
  const port = configService.get<string>('ARS_DB_PORT') || '1521';
  const sid = configService.get<string>('ARS_DB_SID');
  const serviceName = configService.get<string>('ARS_DB_SERVICE_NAME');

  return {
    name: BASE_SCHEMA.ACS_RS,
    type: 'oracle',
    username: configService.get<string>('ARS_DB_USERNAME'),
    password: configService.get<string>('ARS_DB_PASSWORD'),
    connectString: buildOracleConnectString(host, port, sid, serviceName),
    autoLoadEntities: true,
    synchronize: false,
  };
};