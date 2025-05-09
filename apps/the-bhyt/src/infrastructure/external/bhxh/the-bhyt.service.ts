import { Injectable, Logger } from '@nestjs/common';
import { ITheBhytRepository } from '../../../domain/interfaces/the-bhyt.repository.interface';
import { CheckTheBhytDto } from '../../../application/dtos/check-the-bhyt.dto';
import { BhxhApiService } from './bhxh-api.service';

@Injectable()
export class TheBhytService implements ITheBhytRepository {
  private readonly logger = new Logger(TheBhytService.name);

  constructor(private readonly bhxhApiService: BhxhApiService) {}

  async checkTheBhyt(params: CheckTheBhytDto): Promise<any> {
    if (!params.token || !params.idToken) {
      throw new Error('Token or ID token is missing');
    }

    return this.bhxhApiService.checkTheBhyt({
      maThe: params.maThe,
      hoTen: params.hoTen,
      ngaySinh: params.ngaySinh,
      token: params.token,
      idToken: params.idToken
    });
  }
} 