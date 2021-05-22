import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterService } from 'src/app/utils/character.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { ResetTimerService } from 'src/app/utils/reset-timer.service';
import { CharacterInfo } from '../settings/settings.component';
import { Boss } from './components/bosses-checklist/bosses-checklist.component';

export interface BossesChecklists {
  characterId?: number;
  dailyBosses: Boss[];
  weeklyBosses: Boss[];
  monthlyBosses: Boss[];
  totalWeeklyMesos: number;
  totalAmountOfPowerCrystals: number;
}

@Injectable({
  providedIn: 'root',
})
export class BossService {
  private readonly dailyBosses: Boss[] = [
    {
      name: 'Zakum',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Zakum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 612500,
      selected: true,
      completed: false,
    },
    {
      name: 'Mori Ranmaru',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 648000,
      selected: true,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 684500,
      selected: true,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 722000,
      selected: true,
      completed: false,
    },
    {
      name: 'Hilla',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 800000,
      selected: true,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 882000,
      selected: true,
      completed: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: true,
      completed: false,
    },
    {
      name: 'Pierre',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: true,
      completed: false,
    },
    {
      name: 'Vellum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: true,
      completed: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: true,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1012500,
      selected: true,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1058000,
      selected: true,
      completed: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1152000,
      selected: true,
      completed: false,
    },
    {
      name: 'Julieta',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1200000,
      selected: true,
      completed: false,
    },
    {
      name: 'OMNI-CLN',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1250000,
      selected: true,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'chaos',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1352000,
      selected: true,
      completed: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1404500,
      selected: true,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1458000,
      selected: true,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2450000,
      selected: true,
      completed: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2520000,
      selected: true,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2592000,
      selected: true,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2664500,
      selected: true,
      completed: false,
    },
  ];

  private readonly weeklyBosses: Boss[] = [
    {
      name: 'Cygnus',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 9112500,
      selected: true,
      completed: false,
    },
    {
      name: 'Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 11250000,
      selected: true,
      completed: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 12800000,
      selected: true,
      completed: false,
    },
    {
      name: 'Cygnus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 14450000,
      selected: true,
      completed: false,
    },
    {
      name: 'Princess Nou',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 15312500,
      selected: true,
      completed: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Pierre',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Zakum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 19012500,
      selected: true,
      completed: false,
    },
    {
      name: 'Vellum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 21012500,
      selected: true,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 26450000,
      selected: true,
      completed: false,
    },
    {
      name: 'Akechi Mitsuhide',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 28800000,
      selected: true,
      completed: false,
    },
    {
      name: 'Lotus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 32512500,
      selected: true,
      completed: false,
    },
    {
      name: 'Damien',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 33800000,
      selected: true,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 35112500,
      selected: true,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 40612500,
      selected: true,
      completed: false,
    },
    {
      name: 'Will',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 46512500,
      selected: true,
      completed: false,
    },
    {
      name: 'Gloom',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 49612500,
      selected: true,
      completed: false,
    },
    {
      name: 'Darknell',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 52812500,
      selected: true,
      completed: false,
    },
    {
      name: 'Damien',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 70312500,
      selected: true,
      completed: false,
    },
    {
      name: 'Lotus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 74112500,
      selected: true,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 80000000,
      selected: true,
      completed: false,
    },
    {
      name: 'Will',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 88200000,
      selected: true,
      completed: false,
    },
    {
      name: 'Gloom',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 92450000,
      selected: true,
      completed: false,
    },
    {
      name: 'Darknell',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 96800000,
      selected: true,
      completed: false,
    },
    {
      name: 'Verus Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 110450000,
      selected: true,
      completed: false,
    },
  ];

  private readonly monthlyBosses: Boss[] = [
    {
      name: 'Black Mage',
      difficulty: 'hard',
      frequency: 'monthly',
      perWeekAmount: 1,
      bossCrystalMesos: 500000000,
      selected: false,
      completed: false,
    },
  ];

  selectedCharacter: CharacterInfo | null = null;

  constructor(
    private localStorage: LocalStorageService,
    private resetTimerService: ResetTimerService,
    private characterService: CharacterService
  ) {
    this.localStorage.set(
      LocalStorageKeys.bossesChecklists,
      this.bossesChecklists
    );

    this.characterService
      .watchSelectedCharacter()
      .subscribe((character) => (this.selectedCharacter = character));

    this.resetTimerService.onReset.subscribe(() => {
      this.resetAllDailyBosses();
    });

    this.resetTimerService.onWeeklyReset.subscribe(() => {
      this.resetAllWeeklyBosses();
    });
  }

  watchBossesChecklists(): Observable<BossesChecklists[] | null> {
    return this.localStorage.watch<BossesChecklists[] | null>(
      LocalStorageKeys.bossesChecklists
    );
  }

  resetAllDailyBosses() {
    const bossesChecklists = this.bossesChecklists;

    bossesChecklists.forEach((checklist) => {
      checklist.dailyBosses.forEach((boss) => {
        if (boss.selected) {
          boss.completed = false;
        }
      });
    });

    this.saveBossesChecklists(bossesChecklists);
  }

  resetAllWeeklyBosses() {
    const bossesChecklists = this.bossesChecklists;

    bossesChecklists.forEach((checklists) => {
      checklists.weeklyBosses.forEach((boss) => {
        if (boss.selected) {
          boss.completed = false;
        }
      });
    });

    this.saveBossesChecklists(bossesChecklists);
  }

  saveCharacterBossChecklists(
    characterId: number,
    checklists: BossesChecklists
  ) {
    const currentBossesChecklists = this.bossesChecklists;
    const checklistIndex = currentBossesChecklists.findIndex(
      (checklist) => checklist.characterId === characterId
    );

    if (checklistIndex >= 0) {
      currentBossesChecklists[checklistIndex] = checklists;
    } else {
      currentBossesChecklists.push(checklists);
    }

    this.localStorage.set(
      LocalStorageKeys.bossesChecklists,
      currentBossesChecklists
    );
  }

  saveBossesChecklists(checklists: BossesChecklists[]) {
    const bossesChecklists = this.bossesChecklists;

    this.localStorage.set(LocalStorageKeys.bossesChecklists, bossesChecklists);
  }

  getDefaultBossesChecklists() {
    const totalDailyMesos = this.dailyBosses.reduce((total, boss) => {
      total += boss.bossCrystalMesos;
      return total;
    }, 0);

    const totalWeeklyMesos = this.weeklyBosses.reduce((total, boss) => {
      total += boss.bossCrystalMesos;
      return total;
    }, 0);

    const totalDailySelected = this.dailyBosses.reduce((total, boss) => {
      total += boss.selected === true ? 1 : 0;
      return total;
    }, 0);

    const totalWeeklySelected = this.weeklyBosses.reduce((total, boss) => {
      total += boss.selected === true ? 1 : 0;
      return total;
    }, 0);

    return {
      dailyBosses: this.dailyBosses,
      weeklyBosses: this.weeklyBosses,
      monthlyBosses: this.monthlyBosses,
      totalWeeklyMesos: totalDailyMesos + totalWeeklyMesos,
      totalAmountOfPowerCrystals: totalDailySelected + totalWeeklySelected,
    };
  }

  private get bossesChecklists() {
    const bossesChecklists = this.localStorage.get<BossesChecklists[]>(
      LocalStorageKeys.bossesChecklists
    );

    return bossesChecklists ?? [];
  }
}
