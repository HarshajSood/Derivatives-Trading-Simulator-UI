import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  UntypedFormControl,
  ValidationErrors,
} from '@angular/forms';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseControlValueAccessor
  implements ControlValueAccessor, OnDestroy, OnInit
{
  protected readonly unsubscribe = new Subject<any>();
  private onChangeCallback: (_: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  @Input() placeholder = '';
  @Input() isRequired = true;

  readonly formControl = new UntypedFormControl(undefined, () =>
    this.matchControlValidation()
  );

  constructor(public control: NgControl) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
      .subscribe((value) => this.onChange(value));

    this.formControl.statusChanges
      .pipe(
        filter(() => this.formControl.touched),
        distinctUntilChanged(),
        filter(() => this.onTouchedCallback != null),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.onTouchedCallback());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
  }

  writeValue(obj: any): void {
    if (obj !== this.formControl.value) {
      this.formControl.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  protected onChange(value: any) {
    this.onChangeCallback(value);
    this.formControl.updateValueAndValidity({ emitEvent: false });
  }

  protected matchControlValidation(): ValidationErrors | null {
    return this.control.valid ? null : { hasErrors: true };
  }
}
