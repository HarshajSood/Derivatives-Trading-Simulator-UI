import { Component, Input } from '@angular/core';
import { BaseControlValueAccessor } from '../../FormComponents/base-control-value-accessor';
import { NgControl } from '@angular/forms';
import { FormSelectItem } from 'src/app/Models/shared.models';

@Component({
  selector: 'base-select',
  templateUrl: './base.select.html',
})
export class BaseSelectComponent extends BaseControlValueAccessor {
  @Input() items: FormSelectItem[] = [{ id: 0, text: 'None' }];
  constructor(control: NgControl) {
    super(control);
  }
}
