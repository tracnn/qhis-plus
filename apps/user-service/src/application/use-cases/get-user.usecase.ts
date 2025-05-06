import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { GetUserRequest, GetUserResponse } from '../dto/get-user.dto';

@Injectable()
export class GetUserUseCase {
  constructor(
        @Inject('IUserRepository')
        private readonly userRepo: IUserRepository
    ) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepo.findById(request.id);
    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}