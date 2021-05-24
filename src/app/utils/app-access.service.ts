import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../constants/local-storage-constants';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';
import { ResetTimerService } from './reset-timer.service';
import { DailyService } from '../pages/dailies/daily.service';
import { BossService } from '../pages/bosses/boss.service';
import { environment } from 'src/environments/environment';

export interface RerouteOptions {
  reroute: boolean;
  route: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppAccessService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private resetTimerService: ResetTimerService,
    private dailyService: DailyService,
    private bossService: BossService
  ) {}

  processLatestAppAccess(rerouteOptions: RerouteOptions = { reroute: false, route: '' }) {
    const previousAppAccessEpoch = this.localStorage.get<number>(LocalStorageKeys.lastAppAccessEpochNum);

    if (previousAppAccessEpoch !== null) {
      const previousAppAccessUtc = moment(previousAppAccessEpoch).utc();
      const midnightUtc = this.resetTimerService.getCurrentMidnightUtc();
      const weeklyMidnightUtc = this.resetTimerService.getCurrentMidnightUtc();

      const dailyDifference = midnightUtc.diff(previousAppAccessUtc);
      const dailyDuration = moment.duration(dailyDifference);

      const weeklyDifference = weeklyMidnightUtc.diff(previousAppAccessUtc);
      const weeklyDuration = moment.duration(weeklyDifference);

      if (dailyDuration.asHours() >= 24) {
        this.dailyService.resetAllDailiesInLists();
        this.bossService.resetAllDailyBosses();
      }

      if (weeklyDuration.asDays() >= 7) {
        this.bossService.resetAllWeeklyBosses();
      }

      if (rerouteOptions.reroute && environment.production) {
        this.router.navigate([rerouteOptions.route]);
      }
    }

    this.localStorage.set(LocalStorageKeys.lastAppAccessEpochNum, moment().utc().valueOf());
  }
}
