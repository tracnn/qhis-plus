import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserServiceGrpc {
  GetUser(data: { id: string }): Observable<{ id: string; name: string; email: string }>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  async validateUser(id: string) {
    const response = await this.userService.GetUser({ id }).toPromise();
  
    return response;
  }
}