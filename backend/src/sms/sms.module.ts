import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SendOtpHandler } from './commands/send-otp.handler';

const CommandHandlers = [SendOtpHandler];

@Module({
  controllers: [SmsController],
  providers: [SmsService, ...CommandHandlers],
  imports: [CqrsModule],
  exports: [CqrsModule],
})
export class SmsModule {}
