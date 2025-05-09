import { NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';
import { ValidationExceptionFilter } from './presentation/filters/validation-exception.filter';
import { EnvConfig } from '../../shared/config/env.config';
import { ValidationPipe, BadRequestException, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validateCustomDecorators: true,
      dismissDefaultMessages: false,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
          value: error.value
        }));
        throw new BadRequestException({
          statusCode: 400,
          error: 'ValidationError',
          details: formattedErrors
        });
      }
    })
  );

  // Global exception filters
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    //new HttpExceptionFilter()
  );

  await app.listen(EnvConfig.TheBhytPort);
  console.log(`🚀 the-bhyt microservice running http://localhost:${EnvConfig.TheBhytPort}`);
}

bootstrap();
