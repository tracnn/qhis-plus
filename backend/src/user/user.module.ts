import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UpdateUserHandler, DeleteUserHandler } from './commands/handlers/user-command.service';
import { GetUserHandler, GetUsersHandler } from './queries/handlers/user-query.service';
import { HealthInsuranceCardModule } from '../health-insurance-card/health-insurance-card.module';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CheckDuplicateIdentityNumberHandler } from './queries/check-duplicate-identity-number.handler';
import { CheckHealthInsuranceHandler } from './queries/check-health-insurance.handler';
import { CheckDuplicateUsernameHandler } from './queries/check-duplicate-username.handlers';
import { CheckDuplicateInsuranceNumberHandler } from './queries/check-duplicate-insurance-number.handlers';
import { CreateUserHandler } from './commands/create-user.handler';
import { AuthModule } from '../auth/auth.module';
import { SdaModuleModule } from '../catalog-module/sda-module/sda-module.module';
import { AddressLocationResolverService } from './services/address-location-resolver.service';
import { UserRepository } from './repositories/user.repository';
import { registerExtendedRepo } from '@common/base.repository.provider';
import { OtpModule } from '../otp/otp.module';
import { UpdateUserActiveStatusHandler } from './commands/update-user-active-status.handler';
import { UpdatePasswordWithOtpHandler } from './commands/update-password-with-otp.handler';
import { CheckDuplicatePhoneNumberHandler } from './queries/check-duplicate-phone-number.handler';
import { ChangePasswordHandler } from './commands/change-password.handler';

const CommandHandlers = [
  ChangePasswordHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User], BASE_SCHEMA.DEFAULT), 
    CqrsModule,
    HealthInsuranceCardModule,
    AuthModule,
    SdaModuleModule,
    forwardRef(() => OtpModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    GetUserHandler,
    GetUsersHandler,
    CheckDuplicateIdentityNumberHandler,
    CheckHealthInsuranceHandler,
    CheckDuplicateUsernameHandler,
    CheckDuplicateInsuranceNumberHandler,
    CreateUserHandler,
    AddressLocationResolverService,
    UpdateUserActiveStatusHandler,
    UpdatePasswordWithOtpHandler,
    CheckDuplicatePhoneNumberHandler,
    ...CommandHandlers,
    registerExtendedRepo(User, UserRepository, 'UserRepository', BASE_SCHEMA.DEFAULT),
  ],
  exports: [CqrsModule, 'UserRepository', UserService, AddressLocationResolverService],
})
export class UserModule { }
