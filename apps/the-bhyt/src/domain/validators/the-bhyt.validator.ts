import { TheBhyt } from '../entities/the-bhyt.entity';

export class TheBhytValidator {
  static validate(entity: TheBhyt): string[] {
    const errors: string[] = [];
    if (!entity.value || entity.value.trim() === '') {
      errors.push('Giá trị không được để trống.');
    }
    return errors;
  }
}
