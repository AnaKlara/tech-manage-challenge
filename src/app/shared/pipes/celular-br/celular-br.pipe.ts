import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celularBr'
})
export class CelularBrPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    let phone = value.toString();

    phone = phone.replace(/\D/g, '');
    if (phone.length !== 11) return value.toString();

    return `(${phone.substring(0, 2)}) ${phone.substring(2, 3)} ${phone.substring(3, 7)}-${phone.substring(7)}`;
  }

}
