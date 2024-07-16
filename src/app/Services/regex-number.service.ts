import { Injectable } from '@angular/core';

@Injectable()
export class RegexNumberService {
  protected readonly startingNumberGroupPattern: RegExp = /^(-?)\d*\.?\d*/g;
  protected readonly amountPattern: RegExp =
    /^(-?)\d*(\.\d*)?(k|K|m|M|b|B|t|T)?$/;
  protected readonly wellFormedNumberPattern: RegExp =
    /^(-?)(\d|\d\d|\d\d\d)(,\d\d\d)*(\.\d*)?$/;

  constructor() {}

  validate(value: string): boolean {
    const trimmed = this.trimDelimeters(value);
    return this.amountPattern.test(trimmed);
  }

  isWellFormedNumber(value: string): boolean {
    return this.wellFormedNumberPattern.test(value) || value == '';
  }

  calculate(value: string): number {
    const trimmed = this.trimDelimeters(value);
    const num = trimmed.match(this.startingNumberGroupPattern);
    const m = this.multiplier(value);

    if (num) {
      const x = Number(num[0]);
      const product = x * m;
      return product;
    }

    return 0;
  }

  format(value: number, precision: number): string {
    if (value == null) return '';
    const num = Number(value.toFixed(precision));
    const result = num.toLocaleString('en', {
      maximumFractionDigits: precision,
    });
    return result;
  }

  parseNumber(value: string): number {
    const trimmed = this.trimDelimeters(value);
    const num = Number(trimmed);
    return num;
  }

  private multiplier(value: string): number {
    if (!this.amountPattern.test(value)) return 1;
    if (value.match(/(k|K)$/)) return 1000;
    if (value.match(/(m|M)$/)) return 1000000;
    if (value.match(/(b|B)$/)) return 1000000000;
    if (value.match(/(t|T)$/)) return 1000000000000;

    return 1;
  }

  private trimDelimeters(value: string | null): string {
    if (value == null) return '';
    return value.replace(new RegExp(',', 'g'), '');
  }
}
