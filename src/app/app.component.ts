import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from './constants/local-storage-constants';
import { LocalStorageService } from './utils/local-storage.service';
import { ResetTimerService } from './utils/reset-timer.service';
import * as moment from 'moment';
import { DailyService } from './pages/dailies/daily.service';
import { BossService } from './pages/bosses/boss.service';
import { Router } from '@angular/router';
import { CharacterService } from './utils/character.service';
import { CharacterInfo } from './pages/settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maple-dailies';
  selectedCharacter: CharacterInfo | null = null;

  // TODO: move this heavy logic into APP_INITALIZIER in order to keep the app component clean.
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private resetTimerService: ResetTimerService,
    private dailyService: DailyService,
    private bossService: BossService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.setLocalStorageWatchers();
    this.handleSettingDarkMode();
    this.processLatestAppAccess();
  }

  setLocalStorageWatchers() {
    this.localStorage
      .watch<boolean>(LocalStorageKeys.darkMode)
      .subscribe((value: boolean | null) => this.setDarkModeOnDocument(value));

    this.localStorage
      .watch<CharacterInfo>(LocalStorageKeys.selectedCharacter)
      .subscribe((value: CharacterInfo | null) =>
        this.setSelectedCharacter(value)
      );
  }

  handleSettingDarkMode() {
    const darkModeEnabledValue = this.localStorage.get<boolean>(
      LocalStorageKeys.darkMode
    );

    if (darkModeEnabledValue === null) {
      this.localStorage.set(LocalStorageKeys.darkMode, true);
      this.setDarkModeOnDocument(true);
    } else {
      this.setDarkModeOnDocument(darkModeEnabledValue);
    }
  }

  setDarkModeOnDocument(value: boolean | null) {
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      htmlElement.className = value ? 'dark' : 'light';
    }
  }

  setSelectedCharacter(value: CharacterInfo | null) {
    this.selectedCharacter = value;
  }

  processLatestAppAccess() {
    const previousAppAccessEpoch = this.localStorage.get<number>(
      LocalStorageKeys.lastAppAccessEpochNum
    );

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

      // Reroute to the dailies page if the app has been accessed at least once
      this.router.navigate(['/dailies']);
    }

    this.localStorage.set(
      LocalStorageKeys.lastAppAccessEpochNum,
      moment().utc().valueOf()
    );
  }
}
