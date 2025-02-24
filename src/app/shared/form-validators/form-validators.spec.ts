import { AbstractControl } from '@angular/forms';
import { CustomValidators } from './form-validators';

describe('CustomValidators', () => {
  const createMockControl = (value: any): AbstractControl => ({ value } as AbstractControl);

  test('atLeastTwoWords should return null for valid input', () => {
    expect(CustomValidators.atLeastTwoWords()(createMockControl('Hello World'))).toBeNull();
  });

  test('atLeastTwoWords should return error for single word input', () => {
    expect(CustomValidators.atLeastTwoWords()(createMockControl('Hello'))).toEqual({ atLeastTwoWords: true });
  });

  test('brazilianPhoneNumber should return null for valid phone number', () => {
    expect(CustomValidators.brazilianPhoneNumber()(createMockControl('11987654321'))).toBeNull();
  });

  test('brazilianPhoneNumber should return error for invalid phone number', () => {
    expect(CustomValidators.brazilianPhoneNumber()(createMockControl('1187654321'))).toEqual({ invalidPhoneNumber: true });
  });

  test('matchEmailConfirm should return null when emails match', () => {
    const control: any = { value: 'test@example.com', parent: { get: () => ({ value: 'test@example.com' }) } };
    expect(CustomValidators.matchEmailConfirm('email')(control)).toBeNull();
  });

  test('matchEmailConfirm should return error when emails do not match', () => {
    const control: any = { value: 'test@example.com', parent: { get: () => ({ value: 'other@example.com' }) } };
    expect(CustomValidators.matchEmailConfirm('email')(control)).toEqual({ matchEmails: true });
  });

  test('minAge should return null for valid age', () => {
    expect(CustomValidators.minAge(18)(createMockControl('01/01/2000'))).toBeNull();
  });

  test('minAge should return error for underage', () => {
    expect(CustomValidators.minAge(18)(createMockControl('01/01/2010'))).toEqual({ minAgeNotMet: true });
  });

  test('maxAge should return null for valid age', () => {
    expect(CustomValidators.maxAge(65)(createMockControl('01/01/1960'))).toBeNull();
  });

  test('maxAge should return error for age exceeding limit', () => {
    expect(CustomValidators.maxAge(65)(createMockControl('01/01/1920'))).toEqual({ maxAgeExceeded: true });
  });

  test('dateFormat should return null for valid date', () => {
    expect(CustomValidators.dateFormat()(createMockControl('01/01/2000'))).toBeNull();
  });

  test('dateFormat should return error for invalid date', () => {
    expect(CustomValidators.dateFormat()(createMockControl('31/02/2000'))).toEqual({ invalidDate: true });
  });
});
