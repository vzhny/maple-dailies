import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { BehaviorSubject, from, Observable } from 'rxjs';

export interface CsvToJsonMapper {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class CsvToJsonService<T> {
  Papa = Papa;

  results$ = new BehaviorSubject<T[]>([]);

  constructor() {}

  convertCsvToJson(csvPath: string, mapper: CsvToJsonMapper) {
    Papa.parse(csvPath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results, file) => {
        this.results$.next(this.convertToModel(results.data, mapper));
      },
    });
  }

  private convertToModel(data: any[], mapper: CsvToJsonMapper) {
    const originalFields = Object.values(mapper);

    return data.map((datum) => {
      return Object.entries(mapper).reduce((obj, [convertedField, originalField]) => {
        if (originalFields.includes(originalField)) {
          obj[convertedField] = datum[originalField] ?? '—';
        }

        return obj;
      }, {} as any);
    });
  }

  getResults(): Observable<T[]> {
    return this.results$.asObservable();
  }
}
