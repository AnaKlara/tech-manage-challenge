import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCelularBrMask]'
})
export class CelularBrMaskDirective {

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let input = this.control.control?.value || '';

    // Remove non-digit characters
    input = input.replace(/\D/g, '');

    // Limit to 11 characters (Brazilian phone number format)
    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    // Format (XX) X XXXX-XXXX
    let formatted = input;
    if (input.length > 0) {
      formatted = `(${input.substring(0, 2)}`;
    }
    if (input.length > 2) {
      formatted += `) ${input.substring(2, 3)}`;
    }
    if (input.length > 3) {
      formatted += ` ${input.substring(3, 7)}`;
    }
    if (input.length > 7) {
      formatted += `-${input.substring(7, 11)}`;
    }

    // Update input display value
    (event.target as HTMLInputElement).value = formatted;

    // Update FormControl value (only numbers)
    this.control.control?.setValue(input, { emitEvent: false });
  }
}