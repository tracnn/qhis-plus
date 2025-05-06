import { Tracnn } from '../entities/tracnn.entity';

export class TracnnValidator {
  static validate(entity: Tracnn): string[] {
    const errors: string[] = [];
    if (!entity.value || entity.value.trim() === '') {
      errors.push('Giá trị không được để trống.');
    }
    return errors;
  }
}
