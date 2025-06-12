import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Otp } from './entities/otp.entity';
import { OtpController } from './otp.controller';
import { OtpRepository } from './repositories/otp.repository';
import { CreateOtpHandler } from './commands/create-otp.command';
import { BullModule } from '@nestjs/bull';
import { OtpProcessor } from './services/otp.processor';
import { OtpService } from './otp.service';
import { SmsService } from './services/sms.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { registerExtendedRepo } from '../common/base.repository.provider';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CheckBeforeSendOtpHandler } from './queries/check-before-send-otp.handler';
import { UserModule } from 'src/user/user.module';
import { VerifyOtpHandler } from './queries/verify-otp.handler';
import { UpdateOtpHandler } from './commands/otp-update.command';
import { ZaloModule } from 'src/zalo/zalo.module';
import { ZaloService } from './services/zalo.service';

const commandHandlers = [
    CreateOtpHandler,
    UpdateOtpHandler
];

const queryHandlers = [
    CheckBeforeSendOtpHandler,
    VerifyOtpHandler
];

@Module({
    imports: [
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([Otp], BASE_SCHEMA.DEFAULT),
        CqrsModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_SERVER_URL') || '192.168.89.38',
                    port: parseInt(configService.get('REDIS_SERVER_PORT') || '6379'),
                    password: configService.get('REDIS_SERVER_PASSWORD') || '',
                    //username: configService.get('REDIS_SERVER_USERNAME') || '',
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'otp-queue',
        }),
        HttpModule,
        ZaloModule
    ],
    controllers: [OtpController],
    providers: [
        OtpProcessor,
        OtpService,
        SmsService,
        ZaloService,
        registerExtendedRepo(Otp, OtpRepository, 'OtpRepository', BASE_SCHEMA.DEFAULT),
        ...commandHandlers,
        ...queryHandlers
    ],
    exports: [CqrsModule, OtpService]
})
export class OtpModule {} 