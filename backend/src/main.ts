import './global-shim';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createWinstonLoggerOptions } from './common/winston.config';
import { ResponseInterceptor } from './common/response.interceptor';
import { GlobalHttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(createWinstonLoggerOptions()),
  });

  // Use ResponseInterceptor for all responses
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable CORS
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  
  // Use GlobalHttpExceptionFilter for all exceptions
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // Swagger configuration
  const swaggerTitle = process.env.SWAGGER_TITLE || 'BM Patient Hub API';
  const swaggerDesc = process.env.SWAGGER_DESC || 'The BM Patient Hub API documentation';
  const swaggerVersion = process.env.API_VERSION || '1.0';
  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDesc)
    .setVersion(swaggerVersion)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');
  logger.debug('Debug message');
  logger.warn('Warning message');
  logger.error('Error message');

  await app.listen(process.env.APP_PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
