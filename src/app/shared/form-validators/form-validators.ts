import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastTwoWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || typeof control.value !== 'string') {
      return null;
    }

    const words = control.value.trim().split(/\s+/);
    return words.length >= 2 ? null : { atLeastTwoWords: true };
  };
}
