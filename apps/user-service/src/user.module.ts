import { Module } from '@nestjs/common';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserGrpcController } from './interfaces/grpc/user.grpc';

@Module({
  controllers: [UserGrpcController],
  providers: [
    GetUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}