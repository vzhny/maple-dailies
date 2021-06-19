import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageSize } from 'src/app/framework/pagination/pagination.component';

type Alignment = 'left' | 'center' | 'right';

export interface TableColumn {
  headerTitle: string;
  textAlign: Alignment;
  width?: string;
}

export interface TableData {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: TableData[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() tableClasses!: string | string[];
  @Input() fixed = false;
  @Input() pagination = false;
  @Input() pageSize: PageSize = 10;

  rows: TableData[] = [];
  numberOfColumns = 0;

  emDash = '—';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.pagination) {
      this.rows = [...this.data];
    }
  }

  setTableBorderClass() {
    if (this.fixed) {
      return 'border-fixed';
    } else {
      return 'border-auto';
    }
  }

  setFlexJustifyClass() {
    if (this.pagination) {
      return 'justify-between';
    } else {
      return 'justify-end';
    }
  }

  onPaginate(paginatedData: TableData[]) {
    // Using setTimeout in order for angular to detect the changes to the rows list on the
    // next browser microtask; solution via this video: https://youtu.be/O47uUnJjbJc?t=197
    setTimeout(() => {
      this.rows = paginatedData as TableData[];

      if (this.rows.length > 0) {
        const firstRow = this.rows[0];

        this.numberOfColumns = Object.keys(firstRow).length;
      }
    }, 0);
  }
}
