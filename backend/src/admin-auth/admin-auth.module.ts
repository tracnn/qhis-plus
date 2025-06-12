import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { LoginHandler } from './commands/login.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, LoginHandler],
  exports: [CqrsModule],
})
export class AdminAuthModule {}
