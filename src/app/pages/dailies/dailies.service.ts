import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { Daily, DailyList } from './dailies.component';

@Injectable({
  providedIn: 'root',
})
export class DailiesService {
  private readonly dailiesListsKey = 'dailiesLists';
  private readonly systemDailies: DailyList[] = [
    {
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
          text: 'Arcana - Kill/Fetch Quest',
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
          text: 'Lachelein - Kill/Fetch Quest',
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
          text: 'Chu Chu Island - Kill/Fetch Quest',
          completed: false,
          hidden: false,
        },
        {
          dailyListId: 1,
          text: 'Chu Chu Island - Hard Muto',
          completed: false,
          hidden: false,
        },
        {
          dailyListId: 1,
          text: 'Vanishing Journey - Kill/Fetch Quest',
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
    },
  ];

  constructor(private localStorage: LocalStorageService) {
    this.localStorage.set(this.dailiesListsKey, this.dailiesLists);
  }

  watchDailiesLists(): Observable<DailyList[] | null> {
    return this.localStorage.watch<DailyList[] | null>(this.dailiesListsKey);
  }

  saveDailiesLists(lists: DailyList[]) {
    this.localStorage.set(this.dailiesListsKey, lists);
  }

  addDailyList(title: string) {
    const currentDailiesLists = this.dailiesLists;

    currentDailiesLists.push({
      dailyListId: currentDailiesLists.length + 1,
      title,
      dailies: [],
      systemFlag: false,
    });

    this.saveDailiesLists(currentDailiesLists);
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

  private getDailyListIndex(dailyListId: number) {
    return this.dailiesLists.findIndex(
      (list) => list.dailyListId === dailyListId
    );
  }

  private get dailiesLists() {
    const dailiesLists = this.localStorage.get<DailyList[]>(
      this.dailiesListsKey
    );

    return dailiesLists ?? this.systemDailies;
  }
}
