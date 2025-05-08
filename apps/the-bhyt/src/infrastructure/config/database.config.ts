import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';
import { EnvConfig } from './env.config';
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: EnvConfig.DB_MYSQL_HOST,
  port: EnvConfig.DB_MYSQL_PORT,
  username: EnvConfig.DB_MYSQL_USERNAME,
  password: EnvConfig.DB_MYSQL_PASSWORD,
  database: EnvConfig.DB_MYSQL_NAME,
  entities: [CheckHeinCard],
  synchronize: false,
}; 