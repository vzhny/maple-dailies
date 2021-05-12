import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { Boss } from './components/bosses-checklist/bosses-checklist.component';

export interface BossesChecklists {
  dailyBosses: Boss[];
  weeklyBosses: Boss[];
  monthlyBosses: Boss[];
  totalWeeklyMesos: number;
  totalAmountOfPowerCrystals: number;
}

@Injectable({
  providedIn: 'root',
})
export class BossesService {
  private readonly dailyBosses: Boss[] = [
    {
      name: 'Zakum',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 200000,
      selected: false,
    },
    {
      name: 'Zakum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 612500,
      selected: false,
    },
    {
      name: 'Mori Ranmaru',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 648000,
      selected: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 684500,
      selected: false,
    },
    {
      name: 'Magnus',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 722000,
      selected: false,
    },
    {
      name: 'Hilla',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 800000,
      selected: false,
    },
    {
      name: 'Horntail',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 882000,
      selected: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: false,
    },
    {
      name: 'Pierre',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: false,
    },
    {
      name: 'Vellum',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 968000,
      selected: false,
    },
    {
      name: 'Horntail',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1012500,
      selected: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1058000,
      selected: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'easy',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1152000,
      selected: false,
    },
    {
      name: 'Julieta',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1200000,
      selected: false,
    },
    {
      name: 'OMNI-CLN',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1250000,
      selected: false,
    },
    {
      name: 'Horntail',
      difficulty: 'chaos',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1352000,
      selected: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1404500,
      selected: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 1458000,
      selected: false,
    },
    {
      name: 'Von Leon',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2450000,
      selected: false,
    },
    {
      name: 'Arkarium',
      difficulty: 'hard',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2520000,
      selected: false,
    },
    {
      name: 'Magnus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2592000,
      selected: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'normal',
      frequency: 'daily',
      perWeekAmount: 1,
      bossCrystalMesos: 2664500,
      selected: false,
    },
  ];

  private readonly weeklyBosses: Boss[] = [
    {
      name: 'Cygnus',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 9112500,
      selected: false,
    },
    {
      name: 'Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 11250000,
      selected: false,
    },
    {
      name: 'Pink Bean',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 12800000,
      selected: false,
    },
    {
      name: 'Cygnus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 14450000,
      selected: false,
    },
    {
      name: 'Princess Nou',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 15312500,
      selected: false,
    },
    {
      name: 'Crimson Queen',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: false,
    },
    {
      name: 'Pierre',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: false,
    },
    {
      name: 'Von Bon',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: false,
    },
    {
      name: 'Zakum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 16200000,
      selected: false,
    },
    {
      name: 'Magnus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 19012500,
      selected: false,
    },
    {
      name: 'Vellum',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 21012500,
      selected: false,
    },
    {
      name: 'Papulatus',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 26450000,
      selected: false,
    },
    {
      name: 'Akechi Mitsuhide',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 28800000,
      selected: false,
    },
    {
      name: 'Lotus',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 32512500,
      selected: false,
    },
    {
      name: 'Damien',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 33800000,
      selected: false,
    },
    {
      name: 'Lucid',
      difficulty: 'easy',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 35112500,
      selected: false,
    },
    {
      name: 'Lucid',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 40612500,
      selected: false,
    },
    {
      name: 'Will',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 46512500,
      selected: false,
    },
    {
      name: 'Gloom',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 49612500,
      selected: false,
    },
    {
      name: 'Darknell',
      difficulty: 'normal',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 52812500,
      selected: false,
    },
    {
      name: 'Damien',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 70312500,
      selected: false,
    },
    {
      name: 'Lotus',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 74112500,
      selected: false,
    },
    {
      name: 'Lucid',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 80000000,
      selected: false,
    },
    {
      name: 'Will',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 88200000,
      selected: false,
    },
    {
      name: 'Gloom',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 92450000,
      selected: false,
    },
    {
      name: 'Darknell',
      difficulty: 'chaos',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 96800000,
      selected: false,
    },
    {
      name: 'Verus Hilla',
      difficulty: 'hard',
      frequency: 'weekly',
      perWeekAmount: 1,
      bossCrystalMesos: 110450000,
      selected: false,
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
    },
  ];

  constructor(private localStorage: LocalStorageService) {
    this.localStorage.set(
      LocalStorageKeys.bossesChecklist,
      this.bossesChecklists
    );
  }

  watchBossesChecklists(): Observable<BossesChecklists | null> {
    return this.localStorage.watch<BossesChecklists | null>(
      LocalStorageKeys.bossesChecklist
    );
  }

  saveBossesChecklists(checklists: BossesChecklists) {
    this.localStorage.set(LocalStorageKeys.bossesChecklist, checklists);
  }

  private get bossesChecklists() {
    const bossesChecklists = this.localStorage.get<BossesChecklists>(
      LocalStorageKeys.bossesChecklist
    );

    return (
      bossesChecklists ?? {
        dailyBosses: this.dailyBosses,
        weeklyBosses: this.weeklyBosses,
        monthlyBosses: this.monthlyBosses,
        totalWeeklyMesos: 0,
        totalAmountOfPowerCrystals: 0,
      }
    );
  }
}