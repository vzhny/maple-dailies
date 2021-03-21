import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  constructor() {}

  generateNumberRange(start: number, end: number) {
    return Array(end - start + 1)
      .fill(0)
      .map((_, index) => start + index);
  }
}
