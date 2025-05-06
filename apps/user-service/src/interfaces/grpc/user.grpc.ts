import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { GetUserRequest, GetUserResponse } from '../../application/dto/get-user.dto';

@Controller()
export class UserGrpcController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: GetUserRequest): Promise<GetUserResponse> {
    return this.getUserUseCase.execute(data);
  }
}