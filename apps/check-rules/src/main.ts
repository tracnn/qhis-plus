import { NestFactory, Reflector } from '@nestjs/core';
import { CheckRulesModule } from './check-rules.module';
import { EnvConfig } from '../../shared/config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CheckRulesModule);
  
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true 
  }));
  
  await app.listen(EnvConfig.CheckRulesPort);
}
bootstrap();
