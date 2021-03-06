import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterService } from 'src/app/utils/services/character.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import { BossService } from '../bosses/boss.service';
import { BossesChecklists } from '../bosses/bosses.types';
import { DailyList } from '../dailies/dailies.types';
import { DailyService } from '../dailies/daily.service';
import { CharacterInfo } from '../settings/settings.types';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  readonly characterWideCharId = 0;

  showDailies: boolean | null = false;
  showBosses: boolean | null = false;
  showArcaneDailiesInfo: boolean | null = false;
  showHardMutoRecipes: boolean | null = false;

  characterList: CharacterInfo[] = [];
  selectedCharactersIds: number[] = [];
  dailiesLists: DailyList[] = [];
  bossesChecklists: BossesChecklists[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private characterService: CharacterService,
    private dailyService: DailyService,
    private bossService: BossService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.characterService.watchCharacterList().subscribe((characterList) => {
      if (characterList !== null) {
        this.characterList = characterList;
      }
    });

    this.dailyService.watchDailiesLists().subscribe((lists) => {
      if (lists !== null) {
        const populatedLists = lists.filter((list) => list.dailies.length > 0);

        const characterSpecificDailiesLists = populatedLists.filter((list) => list.characterId !== this.characterWideCharId);
        const characterWideDailiesLists = populatedLists.filter((list) => list.characterId === this.characterWideCharId);

        this.dailiesLists = [...characterSpecificDailiesLists, ...characterWideDailiesLists];
      }
    });

    this.bossService.watchBossesChecklists().subscribe((checklists) => {
      if (checklists !== null) {
        this.bossesChecklists = checklists.filter((checklist) => {
          const hasSelectedDailyBosses = checklist.dailyBosses.filter((boss) => boss.selected).length > 0;
          const hasSelectedWeeklyBosses = checklist.weeklyBosses.filter((boss) => boss.selected).length > 0;

          return hasSelectedDailyBosses || hasSelectedWeeklyBosses;
        });
      }
    });

    this.dashboardService.watchDashboardFilters().subscribe((filters) => {
      if (filters !== null) {
        const { characterIds, showDailies, showBosses, showArcaneDailiesInfo, showHardMutoRecipes } = filters;

        this.selectedCharactersIds = characterIds;
        this.showDailies = showDailies;
        this.showBosses = showBosses;
        this.showArcaneDailiesInfo = showArcaneDailiesInfo;
        this.showHardMutoRecipes = showHardMutoRecipes;
      }
    });
  }
}
