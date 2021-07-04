import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageSize } from '../pagination/pagination.types';
import { TableColumn, TableData } from './table.types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: TableData[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() compact = false;
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
