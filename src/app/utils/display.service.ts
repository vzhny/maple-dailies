import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  constructor() {}

  displayCurrency(x: number, currencySign = null) {
    if (x !== null) {
      const commaDelimitedNumber = x
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if (currencySign) {
        return `${currencySign}${commaDelimitedNumber}`;
      } else {
        return commaDelimitedNumber;
      }
    } else {
      return null;
    }
  }
}
