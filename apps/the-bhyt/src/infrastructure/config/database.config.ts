import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CheckHeinCardModel } from '../database/models/check-hein-card.model';
import { EnvConfig } from './env.config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: EnvConfig.DB_MYSQL_HOST,
  port: EnvConfig.DB_MYSQL_PORT,
  username: EnvConfig.DB_MYSQL_USERNAME,
  password: EnvConfig.DB_MYSQL_PASSWORD,
  database: EnvConfig.DB_MYSQL_NAME,
  entities: [CheckHeinCardModel],
  synchronize: true,
}; 