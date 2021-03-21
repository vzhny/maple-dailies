import { Component, Input, OnInit } from '@angular/core';

type Alignment = 'left' | 'center' | 'right';

type FormatFunc = (value: any) => any;

export interface TableColumn {
  headerTitle: string;
  headerAlign: Alignment;
  property: string;
  format?: FormatFunc | undefined;
}

export interface TableData {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableData[] = [];
  @Input() tableClasses!: string | string[];

  emDash = '—';
  textAlignPropertyMap: { [key: string]: Alignment } = {};
  formatFuncPropertyMap: { [key: string]: FormatFunc } = {};

  constructor() {}

  ngOnInit(): void {
    this.textAlignPropertyMap = this.columns.reduce(
      (map, { headerAlign, property }) => {
        map[property] = headerAlign;

        return map;
      },
      this.textAlignPropertyMap
    );

    this.formatFuncPropertyMap = this.columns.reduce(
      (map, { format, property }) => {
        if (format !== undefined) {
          map[property] = format;
        }

        return map;
      },
      this.formatFuncPropertyMap
    );
  }

  formatValue(key: string, value: any) {
    if (this.formatFuncPropertyMap[key]) {
      return this.formatFuncPropertyMap[key](value);
    } else {
      return value;
    }
  }

  convertToTuples(datum: any) {
    return Object.entries(datum).map(([key, value]) => ({
      key,
      value,
    }));
  }
}
