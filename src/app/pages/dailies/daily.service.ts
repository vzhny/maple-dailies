import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterService } from 'src/app/utils/character.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { ResetTimerService } from 'src/app/utils/reset-timer.service';
import { CharacterInfo } from '../settings/settings.component';
import { Daily, DailyList } from './dailies.component';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  private arcaneRiverAreasByMinLevelMap: { [key: string]: number } = {
    'Vanishing Journey': 200,
    'Chu Chu Island': 210,
    Lachelein: 220,
    Arcana: 225,
    Morass: 230,
    Esfera: 235,
  };

  private arcaneRiverDailiesList: DailyList = {
    characterId: -1,
    dailyListId: 1,
    title: 'Arcane River',
    dailies: [
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
    ],
    systemFlag: true,
  };

  selectedCharacter: CharacterInfo | null = null;

  constructor(
    private localStorage: LocalStorageService,
    private characterService: CharacterService,
    private resetTimerService: ResetTimerService
  ) {
    this.characterService
      .watchSelectedCharacter()
      .subscribe((character) => (this.selectedCharacter = character));

    this.localStorage.set(LocalStorageKeys.dailiesLists, this.dailiesLists);

    this.resetTimerService.onReset.subscribe(() => {
      this.resetAllDailiesInLists();
    });
  }

  watchDailiesLists() {
    return this.localStorage.watch<DailyList[] | null>(
      LocalStorageKeys.dailiesLists
    );
  }

  saveDailiesLists(lists: DailyList[]) {
    this.localStorage.set(LocalStorageKeys.dailiesLists, lists);
  }

  addDailyList(title: string) {
    if (this.selectedCharacter !== null) {
      const currentDailiesLists = this.dailiesLists;

      if (title === 'Arcane River') {
        currentDailiesLists.push({
          ...this.arcaneRiverDailiesList,
          characterId: this.selectedCharacter.id,
        });
      } else {
        currentDailiesLists.push({
          dailyListId: currentDailiesLists.length + 1,
          characterId: this.selectedCharacter.id,
          title,
          dailies: [],
          systemFlag: false,
        });
      }

      this.saveDailiesLists(currentDailiesLists);
    }
  }

  saveDailiesToList(dailyListId: number, dailies: Daily[]) {
    const currentDailiesLists = this.dailiesLists;
    const listIndex = this.getDailyListIndex(dailyListId);

    if (listIndex >= 0) {
      currentDailiesLists[listIndex].dailies = [...dailies];

      this.saveDailiesLists(currentDailiesLists);
    }
  }

  deleteDailyList(dailyListId: number) {
    const currentDailiesLists = this.dailiesLists;
    const listIndex = this.getDailyListIndex(dailyListId);

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

  private getDailyListIndex(dailyListId: number) {
    return this.dailiesLists.findIndex(
      (list) => list.dailyListId === dailyListId
    );
  }

  private get dailiesLists() {
    const dailiesLists = this.localStorage.get<DailyList[]>(
      LocalStorageKeys.dailiesLists
    );

    return dailiesLists ?? [];
  }
}
