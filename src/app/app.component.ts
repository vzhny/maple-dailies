import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from './constants/local-storage-constants';
import { LocalStorageService } from './utils/services/local-storage.service';
import { AppAccessService } from './utils/services/app-access.service';
import { FilePaths } from './constants/file-paths-constants';
import { CharacterInfo } from './pages/settings/settings.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  selectedCharacter: CharacterInfo | null = null;
  defaultCharacterImageSrc = FilePaths.blankCharacterImgSrc;
  characterImageSrc = this.defaultCharacterImageSrc;

  arcaneRiverTownMapFilePaths = FilePaths.arcaneRiverTownMaps;
  backgroundImage = '';

  // TODO: move this heavy logic into APP_INITALIZIER in order to keep the app component clean.
  constructor(private localStorage: LocalStorageService, private appAccessService: AppAccessService) {}

  ngOnInit(): void {
    this.backgroundImage = this.getHeroBackgroundImage();

    this.setLocalStorageWatchers();
    this.handleSettingDarkMode();
    this.appAccessService.processLatestAppAccess({ reroute: true, route: '/dashboard' });
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
      // htmlElement.className = value ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', `maple-dailies-${value ? 'light' : 'dark'}`);
    }
  }

  setSelectedCharacter(value: CharacterInfo | null) {
    this.selectedCharacter = value;

    if (value !== null) {
      this.characterImageSrc = value.characterImgSrcUrl;
    }
  }

  getHeroBackgroundImage() {
    return `url('${this.arcaneRiverTownMapFilePaths[this.generateRandomTownMapIndex()]}')`;
  }

  generateRandomTownMapIndex() {
    return Math.floor(Math.random() * 5);
  }
}
