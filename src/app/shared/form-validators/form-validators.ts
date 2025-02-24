import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { dddBrasil } from './utils/DDD-list';
import * as _moment from 'moment';

export class CustomValidators {
  static atLeastTwoWords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      const words = control.value.trim().split(/\s+/);
      return words.length >= 2 ? null : { atLeastTwoWords: true };
    };
  }

  static brazilianPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const phoneNumber = control.value.replace(/\D/g, '');
      if (!/^\d{11}$/.test(phoneNumber)) {
        return { invalidPhoneNumber: true };
      }
      const ddd = phoneNumber.substring(0, 2);
      const validDDD = Object.keys(dddBrasil.estadoPorDdd);
      if (!validDDD.includes(ddd)) {
        return { invalidDDD: true };
      }
      if (phoneNumber[2] !== '9') {
        return { invalidPhoneNumber: true };
      }
      return null;
    };
  }

  static matchEmailConfirm(emailControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailControl = control.parent?.get(emailControlName);
      if (emailControl && emailControl.value !== control.value) {
        return { matchEmails: true };
      }
      return null;
    };
  }

  static minAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const value = String(control.value);
      if (value.length < 10) return null;
      const [day, month, year] = value.split('/').map((part) => parseInt(part, 10));
      if (!day || !month || !year) return null;
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age < minAge ? { minAgeNotMet: true } : null;
    };
  }

  static maxAge(maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const value = String(control.value);
      if (value.length < 10) return null;
      const [day, month, year] = value.split('/').map((part) => parseInt(part, 10));
      if (!day || !month || !year) return null;
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age > maxAge ? { maxAgeExceeded: true } : null;
    };
  }

  static dateFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const value = String(control.value).trim();
      if (value.length < 8 || value.length > 10) return null;
      const [day, month, year] = value.split('/').map((part) => parseInt(part, 10));
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return { invalidDate: true };
      }
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return { invalidDate: true };
      }
      return null;
    };
  }
}
