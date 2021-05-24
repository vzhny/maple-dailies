import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from './constants/local-storage-constants';
import { LocalStorageService } from './utils/local-storage.service';
import { CharacterInfo } from './pages/settings/settings.component';
import { AppAccessService } from './utils/app-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedCharacter: CharacterInfo | null = null;

  // TODO: move this heavy logic into APP_INITALIZIER in order to keep the app component clean.
  constructor(private localStorage: LocalStorageService, private appAccessService: AppAccessService) {}

  ngOnInit(): void {
    this.setLocalStorageWatchers();
    this.handleSettingDarkMode();
    this.appAccessService.processLatestAppAccess({ reroute: true, route: '/dailies' });
  }

  setLocalStorageWatchers() {
    this.localStorage.watch<boolean>(LocalStorageKeys.darkMode).subscribe((value: boolean | null) => this.setDarkModeOnDocument(value));

    this.localStorage
      .watch<CharacterInfo>(LocalStorageKeys.selectedCharacter)
      .subscribe((value: CharacterInfo | null) => this.setSelectedCharacter(value));
  }

  handleSettingDarkMode() {
    const darkModeEnabledValue = this.localStorage.get<boolean>(LocalStorageKeys.darkMode);

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
}
