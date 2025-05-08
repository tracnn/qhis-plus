import { CheckTheBhytDto } from '../../application/dtos/check-the-bhyt.dto';

export interface ITheBhytRepository {
  checkTheBhyt(params: CheckTheBhytDto): Promise<any>;
} 