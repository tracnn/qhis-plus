import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminLoginHandler } from './commands/login.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminMeQueryHandler } from './queries/admin-me.handler';
import { JwtAdminStrategy } from './jwt-admin.strategy';
import { JwtAdminAuthGuard } from './jwt-admin-auth.guard';
import { PassportModule } from '@nestjs/passport';

const commandHandlers = [
  AdminLoginHandler
];

const queryHandlers = [
  AdminMeQueryHandler
];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-admin' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ADMIN_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_ADMIN_EXPIRES_IN') },
      }),
    }),
    CqrsModule,
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    JwtAdminStrategy,
    JwtAdminAuthGuard,
    ...commandHandlers,
    ...queryHandlers,
    JwtService,
  ],
  exports: [CqrsModule],
})
export class AdminAuthModule {}
