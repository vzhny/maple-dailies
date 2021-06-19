import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DailyList } from 'src/app/pages/dailies/dailies.component';
import { ToggleCompletionEvent, ToggleAllCompletionEvent } from 'src/app/pages/dailies/components/daily-list/daily-list.component';
import { DailyService } from 'src/app/pages/dailies/daily.service';
import { CharacterInfo } from 'src/app/pages/settings/settings.component';
import { CharacterService } from 'src/app/utils/services/character.service';
import { DashboardService } from '../../dashboard.service';

interface CharacterDailiesListsTuple {
  character: CharacterInfo;
  dailiesLists: DailyList[];
}

// TODO: move all the duplicated code below and in the dailies component to a shared abstract class/service
@Component({
  selector: 'app-character-dailies-lists',
  templateUrl: './character-dailies-lists.component.html',
  styleUrls: ['./character-dailies-lists.component.scss'],
})
export class CharacterDailiesListsComponent implements OnInit {
  readonly characterWideCharId = 0;

  @Input() dailiesLists: DailyList[] = [];
  @Input() characterList: CharacterInfo[] = [];
  @Input() selectedCharactersIds: number[] = [];

  allDailiesLists: DailyList[] = [];
  characterDailiesListTuplesList: CharacterDailiesListsTuple[] = [];

  selectedListTitle: string | null = null;
  selectedListId = -1;
  isCharacterWideList = false;
  selectedDailyIndex = -1;

  constructor(private dailyService: DailyService, private characterService: CharacterService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.allDailiesLists = [...this.dailiesLists];
    this.characterDailiesListTuplesList = this.generateCharacterDailiesListTuplesList(this.characterList);

    this.dashboardService.watchDashboardFilters().subscribe((filters) => {
      if (filters !== null) {
        const { characterIds } = filters;

        const selectedCharactersList =
          characterIds.length > 0 ? this.characterList.filter((character) => characterIds.includes(character.id)) : this.characterList;

        this.characterDailiesListTuplesList = this.generateCharacterDailiesListTuplesList(selectedCharactersList);
      }
    });
  }

  generateCharacterDailiesListTuplesList(characterList: CharacterInfo[]) {
    const tupleList: CharacterDailiesListsTuple[] = [];
    const characterWideDailiesLists = this.dailiesLists.filter((list) => list.characterId === this.characterWideCharId);

    return characterList.reduce((list, character) => {
      const dailiesLists = this.dailiesLists.filter((list) => list.characterId === character.id);

      if (dailiesLists.length > 0) {
        list.push({
          character,
          dailiesLists: [...dailiesLists, ...characterWideDailiesLists],
        });
      }

      return list;
    }, tupleList);
  }

  onToggleDailyCompletion({ listId, listTitle, characterWideFlag, index, completion }: ToggleCompletionEvent, characterId: number) {
    this.selectedListId = listId;
    this.selectedListTitle = listTitle;
    this.isCharacterWideList = characterWideFlag;
    this.selectedDailyIndex = index;

    const listIndex = this.isCharacterWideList
      ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
      : this.getSelectedDailyListIndex(characterId, this.selectedListId);

    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies[index].completed = completion;
      this.saveDailiesLists();
    }
  }

  onToggleAllDailiesCompletion({ listId, listTitle, characterWideFlag, allCompleted }: ToggleAllCompletionEvent, characterId: number) {
    this.selectedListId = listId;
    this.selectedListTitle = listTitle;
    this.isCharacterWideList = characterWideFlag;

    const listIndex = this.isCharacterWideList
      ? this.getSelectedCharacterWideDailyListIndex(this.characterWideCharId, this.selectedListTitle)
      : this.getSelectedDailyListIndex(characterId, this.selectedListId);
    if (listIndex >= 0) {
      this.dailiesLists[listIndex].dailies.forEach((daily) => {
        if (!daily.hidden) {
          daily.completed = allCompleted;
        }
      });

      this.saveDailiesLists();
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
    this.selectedListId = -1;
    this.selectedListTitle = '';
    this.isCharacterWideList = false;
    this.selectedDailyIndex = -1;
  }

  getCharacterIconFileName(characterClass: string) {
    const info = this.characterService.getCharacterClassInfo(characterClass);

    return this.characterService.buildCharacterIconSrc(info !== undefined ? info.fileName : 'beginner.png');
  }
}
