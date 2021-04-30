import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  faAngleDoubleRight,
  faCheck,
  faCheckDouble,
  faEllipsisH,
  faEye,
  faEyeSlash,
  faPen,
  faPlus,
  faTimes,
  faTimesCircle,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { TableColumn } from 'src/app/framework/table/table.component';
import { Daily } from '../../dailies.component';
import { DailiesService } from '../../dailies.service';

interface DailyEvent {
  listId: number;
}

export interface EditDailyEvent extends DailyEvent {
  index: number;
}

export interface DeleteDailyListEvent extends DailyEvent {
  listTitle: string;
}

export interface ToggleCompletionEvent extends DailyEvent {
  index: number;
  completion: boolean;
}

export interface ToggleAllCompletionEvent extends DailyEvent {
  allCompleted: boolean;
}

export interface ToggleVisibilityEvent extends DailyEvent {
  index: number;
  visibility: boolean;
}

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.scss'],
})
export class DailyListComponent implements OnInit {
  @Input() listId!: number;
  @Input() listTitle!: string;
  @Input() dailies: Daily[] = [];
  @Input() systemList!: boolean;

  @Output() addDaily = new EventEmitter<number>();
  @Output() editDaily = new EventEmitter<EditDailyEvent>();
  @Output() deleteDaily = new EventEmitter<EditDailyEvent>();
  @Output() deleteList = new EventEmitter<DeleteDailyListEvent>();
  @Output() toggleCompletion = new EventEmitter<ToggleCompletionEvent>();
  @Output() toggleAllCompletion = new EventEmitter<ToggleAllCompletionEvent>();
  @Output() toggleVisibility = new EventEmitter<ToggleVisibilityEvent>();

  showActionsIcon = faEllipsisH;
  hideActionsIcon = faAngleDoubleRight;

  checkAllIcon = faCheckDouble;
  addIcon = faPlus;
  editIcon = faPen;
  confirmIcon = faCheck;
  removeIcon = faTimesCircle;
  deleteIcon = faTimes;
  resetIcon = faUndo;

  visibleIcon = faEye;
  hiddenIcon = faEyeSlash;

  isEditing = false;
  showActions = false;

  constructor(private dailiesService: DailiesService) {}

  ngOnInit(): void {}

  toggleCompletedDaily(index: number) {
    if (!this.isEditing) {
      this.toggleCompletion.emit({
        listId: this.listId,
        index,
        completion: !this.dailies[index].completed,
      });
    }
  }

  completeAllDailies() {
    this.toggleAllCompletion.emit({
      listId: this.listId,
      allCompleted: true,
    });
  }

  addNewDaily() {
    this.addDaily.emit(this.listId);
  }

  editExistingDaily(index: number) {
    this.editDaily.emit({
      listId: this.listId,
      index,
    });
  }

  deleteDailyList() {
    this.deleteList.emit({
      listId: this.listId,
      listTitle: this.listTitle,
    });
  }

  toggleEditDailiesList() {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.dailiesService.saveDailiesToList(this.listId, this.dailies);
    }
  }

  removeDaily(index: number) {
    this.dailies.splice(index, 1);
  }

  resetDailies() {
    this.toggleAllCompletion.emit({
      listId: this.listId,
      allCompleted: false,
    });
  }

  toggleDailyVisibility(index: number) {
    if (this.isEditing) {
      this.toggleVisibility.emit({
        listId: this.listId,
        index,
        visibility: !this.dailies[index].hidden,
      });
    }
  }

  get completedList() {
    return this.dailies.filter((daily) => !daily.completed).length === 0;
  }
}
