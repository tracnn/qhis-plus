export class ThaovhValue {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('ThaovhValue không hợp lệ');
    }
  }

  private isValid(val: string): boolean {
    return val.length > 0;
  }

  getValue(): string {
    return this.value;
  }
}
