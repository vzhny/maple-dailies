import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  faAngleDoubleRight,
  faCheck,
  faCheckDouble,
  faCheckSquare,
  faChevronDown,
  faChevronUp,
  faCircle,
  faEllipsisH,
  faEye,
  faEyeSlash,
  faPen,
  faPlus,
  faSquare,
  faTimes,
  faTimesCircle,
  faUndo,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';
import { TableColumn } from 'src/app/framework/table/table.component';
import { Daily } from '../../dailies.component';
import { DailyService } from '../../daily.service';

interface DailyEvent {
  listId: number;
  listTitle: string | null;
  characterWideFlag: boolean;
}

export interface AddDailyEvent extends DailyEvent {}

export interface EditDailyEvent extends DailyEvent {
  index: number;
}

export interface MoveDailyEvent extends DailyEvent {
  fromIndex: number;
  toIndex: number;
}

export interface DeleteDailyListEvent extends DailyEvent {}

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

type MoveDirection = 'up' | 'down';

@Component({
  selector: 'app-daily-list',
  templateUrl: './daily-list.component.html',
  styleUrls: ['./daily-list.component.scss'],
})
export class DailyListComponent implements OnInit {
  @Input() listId!: number;
  @Input() listTitle!: string;
  @Input() dailies: Daily[] = [];
  @Input() characterWideList!: boolean;
  @Input() systemList!: boolean;
  @Input() onDashboard = false;

  @Output() addDaily = new EventEmitter<AddDailyEvent>();
  @Output() editDaily = new EventEmitter<EditDailyEvent>();
  @Output() deleteDaily = new EventEmitter<EditDailyEvent>();
  @Output() moveDaily = new EventEmitter<MoveDailyEvent>();
  @Output() deleteList = new EventEmitter<DeleteDailyListEvent>();
  @Output() toggleCompletion = new EventEmitter<ToggleCompletionEvent>();
  @Output() toggleAllCompletion = new EventEmitter<ToggleAllCompletionEvent>();
  @Output() toggleVisibility = new EventEmitter<ToggleVisibilityEvent>();

  upDirection: MoveDirection = 'up';
  downDirection: MoveDirection = 'down';

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

  upIcon = faChevronUp;
  downIcon = faChevronDown;

  noDailiesInListIcon = faCircle;
  notCompletedIcon = faSquareRegular;
  completedSquareIcon = faSquare;
  characterWideIcon = faUserFriends;

  isEditing = false;
  showActions = false;

  constructor(private dailyService: DailyService) {}

  ngOnInit(): void {}

  toggleCompletedDaily(index: number) {
    if (!this.isEditing) {
      this.toggleCompletion.emit({
        listId: this.listId,
        listTitle: this.listTitle,
        characterWideFlag: this.characterWideList,
        index,
        completion: !this.dailies[index].completed,
      });
    }
  }

  completeAllDailies() {
    this.toggleAllCompletion.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
      allCompleted: true,
    });
  }

  addNewDaily() {
    const payload: AddDailyEvent = {
      listId: this.listId,
      listTitle: null,
      characterWideFlag: false,
    };

    if (this.characterWideList) {
      payload.listTitle = this.listTitle;
      payload.characterWideFlag = true;
    }

    this.addDaily.emit(payload);
  }

  editExistingDaily(index: number) {
    this.editDaily.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
      index,
    });
  }

  deleteDailyList() {
    this.deleteList.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
    });
  }

  toggleEditDailiesList() {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.dailyService.saveDailiesToList(this.listId, this.dailies);
    }
  }

  removeDaily(index: number) {
    this.deleteDaily.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
      index,
    });

    if (this.dailies.length === 0) {
      this.isEditing = false;
      this.showActions = false;
    }
  }

  resetDailies() {
    this.toggleAllCompletion.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
      allCompleted: false,
    });
  }

  toggleDailyVisibility(index: number) {
    if (this.isEditing) {
      this.toggleVisibility.emit({
        listId: this.listId,
        listTitle: this.listTitle,
        characterWideFlag: this.characterWideList,
        index,
        visibility: !this.dailies[index].hidden,
      });
    }
  }

  moveDailyWithinList(direction: MoveDirection, index: number) {
    const fromIndex = index;
    const toIndex = direction === 'up' ? index - 1 : index + 1;

    this.moveDaily.emit({
      listId: this.listId,
      listTitle: this.listTitle,
      characterWideFlag: this.characterWideList,
      fromIndex,
      toIndex,
    });
  }

  getToggleDailiesTooltip() {
    if (!this.hasDailiesInList) {
      return 'Add dailies first!';
    }

    let tooltipMessage = `${this.completedList ? 'Reset' : 'Complete'}`;

    if (this.characterWideList) {
      tooltipMessage = `${tooltipMessage} all character-wide dailies`;
    } else {
      tooltipMessage = `${tooltipMessage} all dailies`;
    }

    return tooltipMessage;
  }

  get hasDailiesInList() {
    return this.dailies.length !== 0;
  }

  get completedList() {
    if (!this.hasDailiesInList) {
      return false;
    } else {
      return this.dailies.filter((daily) => !daily.hidden).filter((daily) => !daily.completed).length === 0;
    }
  }

  get allDailiesHidden() {
    if (!this.hasDailiesInList) {
      return false;
    } else {
      return this.dailies.length === this.dailies.filter((daily) => daily.hidden).length;
    }
  }
}
