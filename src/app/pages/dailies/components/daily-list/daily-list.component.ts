import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/framework/table/table.component';
import { Daily } from '../../dailies.component';

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.scss'],
})
export class DailyListComponent implements OnInit {
  @Input() dailies: Daily[] = [];

  columns: TableColumn[] = [
    {
      headerTitle: 'Daily',
      textAlign: 'left',
      property: 'text',
    },
    {
      headerTitle: 'Done?',
      textAlign: 'left',
      property: 'completed',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleCompletedDaily(index: number) {
    this.dailies[index].completed = !this.dailies[index].completed;
  }
}
