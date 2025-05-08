import { TheBhyt } from '../entities/the-bhyt.entity';

export class TheBhytDomainService {
  static isActive(entity: TheBhyt): boolean {
    return !!entity && entity.value !== '';
  }
}
