import { Component, Input, OnInit } from '@angular/core';
import {
  faCheck,
  faCheckDouble,
  faEye,
  faEyeSlash,
  faPen,
  faPlus,
  faTimesCircle,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { TableColumn } from 'src/app/framework/table/table.component';
import { Daily } from '../../dailies.component';

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.scss'],
})
export class DailyListComponent implements OnInit {
  @Input() headerTitle!: string;
  @Input() dailies: Daily[] = [];

  checkAllIcon = faCheckDouble;
  addIcon = faPlus;
  editIcon = faPen;
  confirmIcon = faCheck;
  removeIcon = faTimesCircle;
  resetIcon = faUndo;

  visibleIcon = faEye;
  hiddenIcon = faEyeSlash;

  isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCompletedDaily(index: number) {
    if (!this.isEditing) {
      this.dailies[index].completed = !this.dailies[index].completed;
    }
  }

  checkAllDailies() {
    this.dailies.forEach((daily) => (daily.completed = true));
  }

  addNewDaily() {
    this.dailies.push({
      text: 'Added Daily Example',
      completed: false,
      hidden: false,
    });
  }

  toggleEditDailiesList() {
    this.isEditing = !this.isEditing;
  }

  removeDaily(index: number) {
    this.dailies.splice(index, 1);
  }

  resetDailies() {
    this.dailies.forEach((daily) => (daily.completed = false));
  }

  toggleDailyVisibility(index: number) {
    if (this.isEditing) {
      this.dailies[index].hidden = !this.dailies[index].hidden;
    }
  }
}
