import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageKeys } from './constants/local-storage-constants';
import { LocalStorageService } from './utils/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maple-dailies';
  characterImageUrlSrc: string | null = null;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.setLocalStorageWatchers();
    this.handleSettingDarkMode();
    this.handleSettingCharacterImage();
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
}
