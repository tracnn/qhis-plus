import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';
import { EnvConfig } from '../../shared/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(EnvConfig.TracnnPort);
  console.log(`🚀 tracnn microservice running http://localhost:${EnvConfig.TracnnPort}`);
}

bootstrap();
