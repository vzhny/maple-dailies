import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from './constants/local-storage-constants';
import { LocalStorageService } from './utils/local-storage.service';
import { ResetTimerService } from './utils/reset-timer.service';
import * as moment from 'moment';
import { DailiesService } from './pages/dailies/dailies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maple-dailies';
  characterImageUrlSrc: string | null = null;

  // TODO: move this heavy logic into APP_INITALIZIER in order to keep the app component clean.
  constructor(
    private localStorage: LocalStorageService,
    private resetTimerService: ResetTimerService,
    private dailiesService: DailiesService
  ) {}

  ngOnInit(): void {
    this.setLocalStorageWatchers();
    this.handleSettingDarkMode();
    this.handleSettingCharacterImage();
    this.processLatestAppAccess();
  }

  setLocalStorageWatchers() {
    this.localStorage
      .watch<boolean>(LocalStorageKeys.darkMode)
      .subscribe((value: boolean | null) => this.setDarkModeOnDocument(value));

    this.localStorage
      .watch<string>(LocalStorageKeys.charImgUrl)
      .subscribe((value: string | null) => this.setCharacterImageUrlSrc(value));
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

  handleSettingCharacterImage() {
    const characterImageUrlSrcValue = this.localStorage.get<string>(
      LocalStorageKeys.charImgUrl
    );

    if (characterImageUrlSrcValue !== null) {
      this.characterImageUrlSrc = characterImageUrlSrcValue;
    }
  }

  setDarkModeOnDocument(value: boolean | null) {
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      htmlElement.className = value ? 'dark' : 'light';
    }
  }

  setCharacterImageUrlSrc(value: string | null) {
    if (value !== null) {
      this.characterImageUrlSrc = value;
    }
  }

  processLatestAppAccess() {
    const previousAppAccessEpoch = this.localStorage.get<number>(
      LocalStorageKeys.lastAppAccessEpochNum
    );

    if (previousAppAccessEpoch !== null) {
      const previousAppAccessUtc = moment(previousAppAccessEpoch).utc();
      const midnightUtc = this.resetTimerService.getCurrentMidnightUtc();

      const difference = midnightUtc.diff(previousAppAccessUtc);
      const duration = moment.duration(difference);

      if (duration.asHours() >= 24) {
        this.dailiesService.resetAllDailiesInLists();
      }
    }

    this.localStorage.set(
      LocalStorageKeys.lastAppAccessEpochNum,
      moment().utc().valueOf()
    );
  }
}
