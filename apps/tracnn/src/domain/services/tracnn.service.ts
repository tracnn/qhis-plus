import { Tracnn } from '../entities/tracnn.entity';

export class TracnnDomainService {
  static isActive(entity: Tracnn): boolean {
    return !!entity && entity.value !== '';
  }
}
