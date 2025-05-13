import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckRulesService {
  getHello(): string {
    return 'Hello World!';
  }
}
