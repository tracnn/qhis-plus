import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';
import { ValidationExceptionFilter } from './presentation/filters/validation-exception.filter';
import { EnvConfig } from '../../shared/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new HttpExceptionFilter()
  );

  await app.listen(EnvConfig.TheBhytPort);
  console.log(`🚀 the-bhyt microservice running http://localhost:${EnvConfig.TheBhytPort}`);
}

bootstrap();
