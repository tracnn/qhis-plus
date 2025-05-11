import { NestFactory } from '@nestjs/core';
import { RuleEvaluatorModule } from './rule-evaluator.module';
import { EnvConfig } from '../../shared/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(RuleEvaluatorModule);
  await app.listen(EnvConfig.RuleEvaluatorPort);
}

bootstrap();
