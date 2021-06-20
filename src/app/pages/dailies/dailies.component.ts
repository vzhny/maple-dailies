import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAsterisk, faBars, faGripHorizontal, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { combineLatest } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { ModalService } from 'src/app/framework/modal/modal.service';
import { CharacterService } from 'src/app/utils/services/character.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import {} from 'src/app/utils/services/reset-timer.service';
import { CharacterInfo } from '../settings/settings.types';
import {
  AddDailyEvent,
  DeleteDailyListEvent,
  EditDailyEvent,
  MoveDailyEvent,
  ToggleAllCompletionEvent,
  ToggleCompletionEvent,
  ToggleVisibilityEvent,
  Daily,
  DailyList,
} from './dailies.types';
import { DailyListPayload, DailyService } from './daily.service';

@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
})
export class DailiesComponent implements OnInit {
  readonly characterWideCharId = 0;

  allDailiesLists: DailyList[] = [];
  dailiesLists: DailyList[] = [];
  selectedCharacter: CharacterInfo | null = null;
  columnLayoutSelected = true;

  addIcon = faPlus;
  columnLayoutIcon = faBars;
  gridLayoutIcon = faGripHorizontal;

  requiredIcon = faAsterisk;
  infoIcon = faInfoCircle;

  dailyListForm: FormGroup | null = null;
  dailyTextForm: FormGroup | null = null;

  selectedListTitle: string | null = null;
  selectedListId = -1;
  isCharacterWideList = false;
  selectedDailyIndex = -1;

  addNewDailyListModalId = 'addNewDailyListModal';
  addEditDailyModalId = 'addNewDailyModal';
  deleteDailyListModalId = 'deleteDailyListModal';

  constructor(
    private modalService: ModalService,
    private dailyService: DailyService,
    private characterService: CharacterService,
    private localStorage: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    combineLatest([this.characterService.watchSelectedCharacter(), this.dailyService.watchDailiesLists()]).subscribe(
      ([character, lists]) => {
        this.selectedCharacter = character;
        this.allDailiesLists = lists ?? [];

        const characterSpecificDailiesLists =
          character !== null && lists !== null ? lists.filter((list) => list.characterId === character.id) : [];

        const characterWideDailiesLists = lists !== null ? lists.filter((list) => list.characterId === this.characterWideCharId) : [];

        this.dailiesLists = [...characterSpecificDailiesLists, ...characterWideDailiesLists];
      }
    );

    this.localStorage
      .watch<boolean>(LocalStorageKeys.columnLayoutSelected)
      .subscribe((value: boolean | null) => this.setDailiesListsLayout(value));

    this.buildForms();
  }

  buildForms() {
    this.dailyListForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      characterWideFlag: new FormControl(false),
    });

    this.dailyTextForm = this.fb.group({
      daily: new FormControl(null, [Validators.required]),
    });
  }

  addNewArcaneRiverDailiesList() {
    if (this.characterIsSelected) {
      this.dailyService.addDailyList({ title: 'Arcane River', characterWideFlag: false });
    }
  }

  addNewDailyList() {
    if (this.characterIsSelected) {
      if (this.dailyListForm !== null && this.dailyListForm.valid) {
        this.dailyService.addDailyList(this.dailyListForm.value as DailyListPayload);
        this.modalService.close(this.addNewDailyListModalId);
        this.resetAll();
      }
    }
  }

  onAddDaily({ listId, listTitle, characterWideFlag }: AddDailyEvent) {
    if (this.selectedCharacter !== null) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.modalService.open(this.addEditDailyModalId);
    }
  }

  onEditDaily({ listId, listTitle, characterWideFlag, index }: EditDailyEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.selectedDailyIndex = index;

      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);

      if (listIndex >= 0) {
        const { text } = this.dailiesLists[listIndex].dailies[index];
        this.dailyText.patchValue(text);
        this.modalService.open(this.addEditDailyModalId);
      }
    }
  }

  onDeleteDaily({ listId, listTitle, characterWideFlag, index }: EditDailyEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.selectedDailyIndex = index;

      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);

      if (listIndex >= 0) {
        this.dailiesLists[listIndex].dailies.splice(index, 1);
        this.saveDailiesLists();
      }
    }
  }

  onMoveDaily({ listId, listTitle, characterWideFlag, fromIndex, toIndex }: MoveDailyEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.selectedDailyIndex = fromIndex;
      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);

      if (listIndex >= 0) {
        const daily = this.dailiesLists[listIndex].dailies[fromIndex];

        this.dailiesLists[listIndex].dailies.splice(fromIndex, 1);
        this.dailiesLists[listIndex].dailies.splice(toIndex, 0, daily);

        this.saveDailiesLists();
      }
    }
  }

  onDeleteDailyList({ listId, listTitle, characterWideFlag }: DeleteDailyListEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.modalService.open(this.deleteDailyListModalId);
    }
  }

  confirmDeleteDailyList() {
    if (this.characterIsSelected) {
      this.dailyService.deleteDailyList(this.selectedListId, this.selectedListTitle, this.isCharacterWideList);
      this.modalService.close(this.deleteDailyListModalId);
      this.resetAll();
    }
  }

  onToggleDailyCompletion({ listId, listTitle, characterWideFlag, index, completion }: ToggleCompletionEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.selectedDailyIndex = index;

      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);

      if (listIndex >= 0) {
        this.dailiesLists[listIndex].dailies[index].completed = completion;
        this.saveDailiesLists();
      }
    }
  }

  onToggleAllDailiesCompletion({ listId, listTitle, characterWideFlag, allCompleted }: ToggleAllCompletionEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;

      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);
      if (listIndex >= 0) {
        this.dailiesLists[listIndex].dailies.forEach((daily) => {
          if (!daily.hidden) {
            daily.completed = allCompleted;
          }
        });

        this.saveDailiesLists();
      }
    }
  }

  onToggleDailyVisibilty({ listId, listTitle, characterWideFlag, index, visibility }: ToggleVisibilityEvent) {
    if (this.characterIsSelected) {
      this.selectedListId = listId;
      this.selectedListTitle = listTitle;
      this.isCharacterWideList = characterWideFlag;
      this.selectedDailyIndex = index;

      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);
      if (listIndex >= 0) {
        this.dailiesLists[listIndex].dailies[index].hidden = visibility;

        if (visibility) {
          this.dailiesLists[listIndex].dailies[index].completed = false;
        }

        this.saveDailiesLists();
      }
    }
  }

  resetDaily(daily: Daily) {
    if (this.characterIsSelected) {
      daily.completed = false;
    }
  }

  openAddNewDailyListModal() {
    if (this.characterIsSelected) {
      this.modalService.open(this.addNewDailyListModalId);
    }
  }

  saveDailyToList(isEdited = false) {
    if (this.characterIsSelected) {
      const listIndex = this.isCharacterWideList
        ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
        : this.getSelectedDailyListIndex(this.selectedCharacter?.id, this.selectedListId);

      if (listIndex >= 0 && this.dailyText?.value) {
        if (isEdited) {
          this.dailiesLists[listIndex].dailies[this.selectedDailyIndex].text = this.dailyText.value;
        } else {
          this.dailiesLists[listIndex].dailies.push({
            dailyListId: this.selectedListId,
            text: this.dailyText.value,
            completed: false,
            hidden: false,
          });
        }

        this.saveDailiesLists();
        this.modalService.close(this.addEditDailyModalId);
      }
    }
  }

  getSelectedCharacterWideDailyListIndex(characterId: number, listTitle: string | null) {
    return this.dailiesLists.findIndex((list) => list.characterId === characterId && list.title === listTitle);
  }

  getSelectedDailyListIndex(characterId: number | undefined, listId: number) {
    return this.dailiesLists.findIndex((list) => list.characterId === characterId && list.dailyListId === listId);
  }

  saveDailiesLists() {
    this.dailiesLists.forEach((list) => {
      const { characterId, dailyListId } = list;
      const index = this.allDailiesLists.findIndex((list) => list.characterId === characterId && list.dailyListId === dailyListId);

      if (index >= 0) {
        this.allDailiesLists[index] = list;
      }
    });

    this.dailyService.saveDailiesLists(this.allDailiesLists);
    this.resetAll();
  }

  resetAll() {
    this.listTitle.patchValue(null);
    this.dailyText.patchValue(null);

    this.selectedListId = -1;
    this.selectedListTitle = '';
    this.isCharacterWideList = false;
    this.selectedDailyIndex = -1;
  }

  toggleListLayout() {
    this.columnLayoutSelected = !this.columnLayoutSelected;

    this.localStorage.set(LocalStorageKeys.columnLayoutSelected, this.columnLayoutSelected);
  }

  setDailiesListsLayout(value: boolean | null) {
    if (value !== null) {
      this.columnLayoutSelected = value;
    }
  }

  get listTitle() {
    if (this.dailyListForm !== null) {
      return this.dailyListForm.controls['title'];
    } else {
      return new FormControl(null);
    }
  }

  get characterWideFlag() {
    if (this.dailyListForm !== null) {
      return this.dailyListForm.controls['characterWideFlag'] as FormControl;
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

  get alreadyHasArcaneRiverDailiesList() {
    return this.dailiesLists.find((list) => list.title === 'Arcane River') !== undefined;
  }

  get characterIsSelected() {
    return this.selectedCharacter !== null;
  }
}
