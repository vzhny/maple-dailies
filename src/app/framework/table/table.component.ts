import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

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
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private subscription!: Subscription | null;

  @Input() set data(data: Observable<TableData[]> | TableData[]) {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (data) {
      if (!(data instanceof Observable)) {
        data = of(data);
      }

      this.subscription = data.subscribe((rows: TableData[]) => {
        this.rows = rows;

        if (this.rows.length > 0) {
          const firstRow = this.rows[0];

          this.numberOfColumns = Object.keys(firstRow).length;
        }
      });
    }
  }

  @Input() columns: TableColumn[] = [];
  @Input() tableClasses!: string | string[];

  rows: TableData[] = [];
  numberOfColumns = 0;

  emDash = '—';

  constructor() {}

  ngOnInit(): void {}
}
