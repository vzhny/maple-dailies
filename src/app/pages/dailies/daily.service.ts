import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterService } from 'src/app/utils/services/character.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import { ResetTimerService } from 'src/app/utils/services/reset-timer.service';
import { CharacterInfo } from '../settings/settings.types';
import { Daily, DailyList } from './dailies.types';
export interface DailyListPayload {
  title: string;
  characterWideFlag: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  private readonly characterWideCharId = 0;
  private arcaneRiverDailies: Daily[] = [
    {
      dailyListId: 1,
      text: 'Esfera - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Morass - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Arcana - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Arcana - Spirit Savior',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Lachelein - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Lachelein - Dream Defender',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Chu Chu Island - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Chu Chu Island - Hard Muto PQ',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Vanishing Journey - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      dailyListId: 1,
      text: 'Vanishing Journey - Edra Spectrum',
      completed: false,
      hidden: false,
    },
  ];

  selectedCharacter: CharacterInfo | null = null;

  constructor(
    private localStorage: LocalStorageService,
    private characterService: CharacterService,
    private resetTimerService: ResetTimerService
  ) {
    this.characterService.watchSelectedCharacter().subscribe((character) => (this.selectedCharacter = character));

    this.localStorage.set(LocalStorageKeys.dailiesLists, this.dailiesLists);

    this.resetTimerService.onReset.subscribe(() => {
      this.resetAllDailiesInLists();
    });
  }

  watchDailiesLists() {
    return this.localStorage.watch<DailyList[] | null>(LocalStorageKeys.dailiesLists);
  }

  addDailyList({ title, characterWideFlag }: DailyListPayload) {
    if (this.selectedCharacter !== null) {
      const currentDailiesLists = this.dailiesLists;

      this.arcaneRiverDailies.forEach((daily) => {
        daily.hidden = false;
        daily.completed = false;
      });

      // TODO: programmatically hide any dailies from areas the user cannot access yet
      const riverDailies = [...this.arcaneRiverDailies];

      riverDailies.forEach((daily) => (daily.dailyListId = currentDailiesLists.length + 1));

      currentDailiesLists.push({
        dailyListId: currentDailiesLists.length + 1,
        characterId: characterWideFlag ? this.characterWideCharId : this.selectedCharacter.id,
        title,
        dailies: title === 'Arcane River' ? riverDailies : [],
        systemFlag: title === 'Arcane River',
      });

      this.saveDailiesLists(currentDailiesLists);
    }
  }

  saveDailiesToList(dailyListId: number, dailies: Daily[]) {
    if (this.selectedCharacter !== null) {
      const currentDailiesLists = this.dailiesLists;
      const listIndex = this.getDailyListIndex(this.selectedCharacter?.id, dailyListId);

      if (listIndex >= 0) {
        currentDailiesLists[listIndex].dailies = [...dailies];

        this.saveDailiesLists(currentDailiesLists);
      }
    }
  }

  deleteDailyList(dailyListId: number, dailyListTitle: string | null, isCharacterWideList: boolean) {
    const currentDailiesLists = this.dailiesLists;
    const listIndex = isCharacterWideList
      ? this.getCharacterWideDailyListIndex(this.characterWideCharId, dailyListTitle)
      : this.getDailyListIndex(this.selectedCharacter?.id, dailyListId);

    if (listIndex >= 0) {
      currentDailiesLists.splice(listIndex, 1);

      this.saveDailiesLists(currentDailiesLists);
    }
  }

  resetAllDailiesInLists() {
    const currentDailiesLists = this.dailiesLists;

    currentDailiesLists.forEach((list) => {
      list.dailies.forEach((daily) => (daily.completed = false));
    });

    this.saveDailiesLists(currentDailiesLists);
  }

  deleteAllAssociatedDailiesLists(characterId: number | null) {
    if (characterId !== null) {
      const updatedDailiesLists = this.dailiesLists.filter((list) => list.characterId !== characterId);

      this.saveDailiesLists(updatedDailiesLists);
    }
  }

  saveDailiesLists(lists: DailyList[]) {
    this.localStorage.set(LocalStorageKeys.dailiesLists, lists);
  }

  private getCharacterWideDailyListIndex(characterId: number, dailyListTitle: string | null) {
    return this.dailiesLists.findIndex((list) => list.characterId === characterId && list.title === dailyListTitle);
  }

  private getDailyListIndex(characterId: number | undefined, dailyListId: number) {
    return this.dailiesLists.findIndex((list) => list.characterId === characterId && list.dailyListId === dailyListId);
  }

  private get dailiesLists() {
    const dailiesLists = this.localStorage.get<DailyList[]>(LocalStorageKeys.dailiesLists);

    return dailiesLists ?? [];
  }
}
