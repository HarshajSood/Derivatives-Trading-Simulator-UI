import { ValidatorFn, Validators } from '@angular/forms';

const positiveAmountPattern = /^\d+(\.\d{1,2})?$/;
const positiveIntegerPattern = /^\d*[1-9]+\d*$/;
const positiveRatePattern = /^\d{1,6}(\.\d{1,13})?$/;

export const minPositiveAmount = 0.01;
export const minPositiveRate = 0.0000000000001;
export const maxPositiveRate = 999999.9999999999999;

export const PositiveAmountValidator = Validators.compose([
  Validators.pattern(positiveAmountPattern),
  Validators.min(minPositiveAmount),
]) as ValidatorFn;
export const RequiredPositiveAmountValidator = Validators.compose([
  Validators.required,
  PositiveAmountValidator,
]) as ValidatorFn;
export const positiveIntegerValidator = Validators.pattern(
  positiveIntegerPattern
);
export const positiveRateValidator = Validators.compose([
  Validators.pattern(positiveRatePattern),
  Validators.min(minPositiveRate),
  Validators.max(maxPositiveRate),
]) as ValidatorFn;
