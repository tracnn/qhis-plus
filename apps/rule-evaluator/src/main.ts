import { NestFactory, Reflector } from '@nestjs/core';
import { RuleEvaluatorModule } from './rule-evaluator.module';
import { EnvConfig } from '../../shared/config/env.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RuleEvaluatorModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: false,
    forbidNonWhitelisted: false,
    forbidUnknownValues: false,
    transform: true 
  }));
  
  await app.listen(EnvConfig.RuleEvaluatorPort);
}

bootstrap();
