import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faBars,
  faGripHorizontal,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { ModalService } from 'src/app/framework/modal/modal.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { ResetTimerService } from 'src/app/utils/reset-timer.service';
import {
  DeleteDailyListEvent,
  EditDailyEvent,
  ToggleAllCompletionEvent,
  ToggleCompletionEvent,
  ToggleVisibilityEvent,
} from './components/daily-list/daily-list.component';
import { DailiesService } from './dailies.service';

export interface DailyList {
  dailyListId: number;
  title: string;
  dailies: Daily[];
  systemFlag: boolean;
}

export interface Daily {
  dailyListId: number;
  text: string;
  completed: boolean;
  hidden: boolean;
}

@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
  styleUrls: ['./dailies.component.scss'],
})
export class DailiesComponent implements OnInit {
  dailiesLists: DailyList[] = [];
  columnLayoutSelected = true;

  addIcon = faPlus;
  columnLayoutIcon = faBars;
  gridLayoutIcon = faGripHorizontal;

  remainingTime: string | null = null;

  dailyListTitleForm: FormGroup | null = null;
  dailyTextForm: FormGroup | null = null;

  seletedListTitle: string | null = null;
  selectedListId = -1;
  selectedDailyIndex = -1;

  addNewDailyListModalId = 'addNewDailyListModal';
  addEditDailyModalId = 'addNewDailyModal';
  deleteDailyListModalId = 'deleteDailyListModal';

  constructor(
    private resetTimerService: ResetTimerService,
    private modalService: ModalService,
    private dailiesService: DailiesService,
    private localStorage: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dailiesService.watchDailiesLists().subscribe((lists) => {
      if (lists !== null) {
        this.dailiesLists = lists;
      } else {
        this.dailiesLists = [];
      }
    });

    this.resetTimerService.remainingTime.subscribe(
      (remainingTime) => (this.remainingTime = remainingTime)
    );

    this.resetTimerService.onReset.subscribe(() => {
      this.dailiesLists.forEach((list) =>
        list.dailies.forEach(this.resetDaily)
      );

      this.saveDailiesLists(this.dailiesLists);
    });

    this.localStorage
      .watch<boolean>(LocalStorageKeys.columnLayoutSelected)
      .subscribe((value: boolean | null) => this.setDailiesListsLayout(value));

    this.buildForms();
  }

  buildForms() {
    this.dailyListTitleForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
    });

    this.dailyTextForm = this.fb.group({
      daily: new FormControl(null, [Validators.required]),
    });
  }

  addNewDailyList() {
    if (this.listTitle?.value !== null) {
      this.dailiesService.addDailyList(this.listTitle.value);
      this.modalService.close(this.addNewDailyListModalId);
      this.resetAll();
    }
  }

  onAddDaily(listId: number) {
    this.selectedListId = listId;
    this.modalService.open(this.addEditDailyModalId);
  }

  onEditDaily({ listId, index }: EditDailyEvent) {
    this.selectedListId = listId;
    this.selectedDailyIndex = index;
    const listIndex = this.getSelectedDailyListIndex(this.selectedListId);

    if (listIndex >= 0) {
      const { text } = this.dailiesLists[listIndex].dailies[index];
      this.dailyText.patchValue(text);
      this.modalService.open(this.addEditDailyModalId);
    }
  }

  onDeleteDaily({ listId, index }: EditDailyEvent) {
    this.selectedListId = listId;
    this.selectedDailyIndex = index;
    const listIndex = this.getSelectedDailyListIndex(this.selectedListId);

    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies.splice(index, 1);
      this.saveDailiesLists(this.dailiesLists);
    }
  }

  onDeleteDailyList({ listId, listTitle }: DeleteDailyListEvent) {
    this.selectedListId = listId;
    this.seletedListTitle = listTitle;
    this.modalService.open(this.deleteDailyListModalId);
  }

  confirmDeleteDailyList() {
    this.dailiesService.deleteDailyList(this.selectedListId);
    this.modalService.close(this.deleteDailyListModalId);
    this.resetAll();
  }

  onToggleDailyCompletion({
    listId,
    index,
    completion,
  }: ToggleCompletionEvent) {
    this.selectedListId = listId;
    this.selectedDailyIndex = index;

    const listIndex = this.getSelectedDailyListIndex(this.selectedListId);

    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies[index].completed = completion;
      this.saveDailiesLists(this.dailiesLists);
      this.resetAll();
    }
  }

  onToggleAllDailiesCompletion({
    listId,
    allCompleted,
  }: ToggleAllCompletionEvent) {
    this.selectedListId = listId;
    const listIndex = this.getSelectedDailyListIndex(this.selectedListId);

    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies.forEach((daily) => {
        if (!daily.hidden) {
          daily.completed = allCompleted;
        }
      });

      this.saveDailiesLists(this.dailiesLists);
    }

    this.resetAll();
  }

  onToggleDailyVisibilty({ listId, index, visibility }: ToggleVisibilityEvent) {
    this.selectedListId = listId;
    this.selectedDailyIndex = index;

    const listIndex = this.getSelectedDailyListIndex(this.selectedListId);

    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies[index].hidden = visibility;
      this.saveDailiesLists(this.dailiesLists);
      this.resetAll();
    }
  }

  resetDaily(daily: Daily) {
    daily.completed = false;
  }

  openAddNewDailyListModal() {
    this.modalService.open(this.addNewDailyListModalId);
  }

  saveDailyToList(isEdited = false) {
    const index = this.getSelectedDailyListIndex(this.selectedListId);

    if (index >= 0 && this.dailyText?.value) {
      if (isEdited) {
        this.dailiesLists[index].dailies[
          this.selectedDailyIndex
        ].text = this.dailyText.value;
      } else {
        this.dailiesLists[index].dailies.push({
          dailyListId: this.selectedListId,
          text: this.dailyText.value,
          completed: false,
          hidden: false,
        });
      }

      this.saveDailiesLists(this.dailiesLists);
      this.modalService.close(this.addEditDailyModalId);
    }

    this.resetAll();
  }

  getSelectedDailyListIndex(listId: number) {
    return this.dailiesLists.findIndex(
      (list) => list.dailyListId === this.selectedListId
    );
  }

  saveDailiesLists(lists: DailyList[]) {
    this.dailiesService.saveDailiesLists(lists);
  }

  resetAll() {
    this.listTitle.patchValue(null);
    this.dailyText.patchValue(null);

    this.seletedListTitle = null;
    this.selectedListId = -1;
    this.selectedDailyIndex = -1;
  }

  toggleListLayout() {
    this.columnLayoutSelected = !this.columnLayoutSelected;

    this.localStorage.set(
      LocalStorageKeys.columnLayoutSelected,
      this.columnLayoutSelected
    );
  }

  setDailiesListsLayout(value: boolean | null) {
    if (value !== null) {
      this.columnLayoutSelected = value;
    }
  }

  get listTitle() {
    if (this.dailyListTitleForm !== null) {
      return this.dailyListTitleForm.controls['title'];
    } else {
      return new FormControl(null);
    }
  }

  get dailyText() {
    if (this.dailyTextForm !== null) {
      return this.dailyTextForm.controls['daily'];
    } else {
      return new FormControl(null);
    }
  }

  get isEditingDaily() {
    return this.selectedDailyIndex !== -1;
  }
}
