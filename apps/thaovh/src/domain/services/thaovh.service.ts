import { Thaovh } from '../entities/thaovh.entity';

export class ThaovhDomainService {
  static isActive(entity: Thaovh): boolean {
    return !!entity && entity.value !== '';
  }
}
