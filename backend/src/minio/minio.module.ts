import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MinioController],
  providers: [
    {
      provide: 'MINIO_CLIENT',
      useFactory: (configService: ConfigService) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Minio = require('minio');
        return new Minio.Client({
          endPoint: configService.get<string>('MINIO_ENDPOINT'),
          port: parseInt(configService.get<string>('MINIO_PORT') || '9000'),
          useSSL: configService.get<string>('MINIO_USE_SSL') === 'true',
          accessKey: configService.get<string>('MINIO_ROOT_USER'),
          secretKey: configService.get<string>('MINIO_ROOT_PASSWORD'),
        });
      },
      inject: [ConfigService],
    },
    MinioService,
  ],
  exports: [MinioService],
})
export class MinioModule {}
