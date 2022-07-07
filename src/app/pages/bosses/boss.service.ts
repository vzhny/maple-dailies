import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterService } from 'src/app/utils/services/character.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import { ResetTimerService } from 'src/app/utils/services/reset-timer.service';
import { CharacterInfo } from '../settings/settings.types';
import { Boss, BossesChecklists } from './bosses.types';

@Injectable({
  providedIn: 'root',
})
export class BossService {
  private readonly dailyBosses: Boss[] = [
    {
      name: 'Zakum',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 1000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Zakum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 3062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 3442500,
      selected: false,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 3610000,
      selected: false,
      completed: false,
    },
    {
      name: 'Hilla',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Mori Ranmaru',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4202500,
      selected: false,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4410000,
      selected: false,
      completed: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4840000,
      selected: false,
      completed: false,
    },
    {
      name: 'Pierre',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4840000,
      selected: false,
      completed: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4840000,
      selected: false,
      completed: false,
    },
    {
      name: 'Vellum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 4840000,
      selected: false,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 5062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 5290000,
      selected: false,
      completed: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 5760000,
      selected: false,
      completed: false,
    },
    {
      name: 'Julieta',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 6000000,
      selected: false,
      completed: false,
    },
    {
      name: 'OMNI-CLN',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 6250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Horntail',
      difficulty: 'chaos',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 6760000,
      selected: false,
      completed: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 7022500,
      selected: false,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 7290000,
      selected: false,
      completed: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 12250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 12602500,
      selected: false,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 12960000,
      selected: false,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 13322500,
      selected: false,
      completed: false,
    },
    {
      name: 'Mori Ranmaru',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 7,
      bossCrystalMesos: 13322500,
      selected: false,
      completed: false,
    },
    
  ];

  private readonly weeklyBosses: Boss[] = [
    {
      name: 'Cygnus',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 45562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 56250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 64000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Cygnus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 72250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 81000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Pierre',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 81000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 81000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Zakum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 81000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Princess Nou',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 81000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Magnus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 95062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Vellum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 105062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 132250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Akechi Mitsuhide',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 144000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Lotus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 162562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Damien',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 169000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Guardian Slime',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 171610000,
      selected: false,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 175562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Will',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 191275000,
      selected: false,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 203062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Will',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 232562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Gloom',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 248062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Darknell',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 264062500,
      selected: false,
      completed: false,
    },
    {
      name: 'Damien',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 351562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Lotus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 370562500,
      selected: false,
      completed: false,
    },
    {
      name: 'Lucid',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 400000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Will',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 441000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Verus Hilla',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 447600000,
      selected: false,
      completed: false,
    },
    {
      name: 'Guardian Slime',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 451562500,
      selected: false,
      completed: false,
    },  
    {
      name: 'Gloom',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 462250000,
      selected: false,
      completed: false,
    },
    {
      name: 'Darknell',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 484000000,
      selected: false,
      completed: false,
    },
    {
      name: 'Verus Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 552250000,
      selected: false,
      completed: false,
    },
  ];

  private readonly monthlyBosses: Boss[] = [
    {
      name: 'Black Mage',
      difficulty: 'hard',
      frequency: 'monthly',
      perWeekAmount: 1,
      bossCrystalMesos: 1500000000,
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
    this.localStorage.set(LocalStorageKeys.bossesChecklists, this.bossesChecklists);

    this.characterService.watchSelectedCharacter().subscribe((character) => (this.selectedCharacter = character));

    this.resetTimerService.onReset.subscribe(() => {
      this.resetAllDailyBosses();
    });

    this.resetTimerService.onWeeklyReset.subscribe(() => {
      this.resetAllWeeklyBosses();
    });
  }

  watchBossesChecklists(): Observable<BossesChecklists[] | null> {
    return this.localStorage.watch<BossesChecklists[] | null>(LocalStorageKeys.bossesChecklists);
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

  saveCharacterBossChecklists(characterId: number, checklists: BossesChecklists) {
    const currentBossesChecklists = this.bossesChecklists;
    const checklistIndex = currentBossesChecklists.findIndex((checklist) => checklist.characterId === characterId);

    if (checklistIndex >= 0) {
      currentBossesChecklists[checklistIndex] = checklists;
    } else {
      currentBossesChecklists.push(checklists);
    }

    this.localStorage.set(LocalStorageKeys.bossesChecklists, currentBossesChecklists);
  }

  saveBossesChecklists(checklists: BossesChecklists[]) {
    this.localStorage.set(LocalStorageKeys.bossesChecklists, checklists);
  }

  getDefaultBossesChecklists() {
    this.dailyBosses.forEach((boss) => {
      boss.selected = false;
      boss.completed = false;
      boss.perWeekAmount = 7;
    });

    this.weeklyBosses.forEach((boss) => {
      boss.selected = false;
      boss.completed = false;
    });

    this.monthlyBosses.forEach((boss) => {
      boss.selected = false;
      boss.completed = false;
    });

    return {
      dailyBosses: this.dailyBosses,
      weeklyBosses: this.weeklyBosses,
      monthlyBosses: this.monthlyBosses,
      totalWeeklyMesos: 0,
      totalAmountOfPowerCrystals: 0,
    };
  }

  private get bossesChecklists() {
    const bossesChecklists = this.localStorage.get<BossesChecklists[]>(LocalStorageKeys.bossesChecklists);

    return bossesChecklists ?? [];
  }
}
