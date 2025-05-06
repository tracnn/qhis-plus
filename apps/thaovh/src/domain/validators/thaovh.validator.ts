import { Thaovh } from '../entities/thaovh.entity';

export class ThaovhValidator {
  static validate(entity: Thaovh): string[] {
    const errors: string[] = [];
    if (!entity.value || entity.value.trim() === '') {
      errors.push('Giá trị không được để trống.');
    }
    return errors;
  }
}
