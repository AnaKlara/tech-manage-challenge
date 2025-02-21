import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from './select-option.model';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleSelectComponent),
      multi: true
    }
  ]
})
export class SimpleSelectComponent implements ControlValueAccessor {

  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Provide a label';
  
  value: string = '';
  isDisabled: boolean = false;
  isOpen = false;

  selectedOption: SelectOption | null = null;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  selectOption(option: SelectOption) {
    this.selectedOption = option;
    this.onChange(this.selectedOption.value);
    this.isOpen = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }


}
