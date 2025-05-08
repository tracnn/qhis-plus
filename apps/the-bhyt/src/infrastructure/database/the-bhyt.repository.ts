import { Injectable, Logger } from '@nestjs/common';
import { ITheBhytRepository } from '../../domain/interfaces/the-bhyt.repository.interface';
import { CheckTheBhytDto } from '../../application/dtos/check-the-bhyt.dto';
import { BhxhApiService } from '../external/bhxh-api.service';

@Injectable()
export class TheBhytRepository implements ITheBhytRepository {
  private readonly logger = new Logger(TheBhytRepository.name);

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
