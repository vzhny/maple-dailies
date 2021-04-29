import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocalStorageService } from './utils/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maple-dailies';
  darkModeEnabledKey = 'darkModeEnabled';

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorage
    this.localStorage
      .watch<string>(LocalStorageKeys.charImgUrl)
      .subscribe((value: string | null) => this.setCharacterImageUrlSrc(value));
  }

    const darkModeEnabledValue = this.localStorage.get<string>(
      this.darkModeEnabledKey
    );

    if (darkModeEnabledValue === null) {
      this.localStorage.set(this.darkModeEnabledKey, 'true');
      this.setDarkModeOnDocument('true');
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

    const htmlElement = document.querySelector('html');

    if (htmlElement) {
  setCharacterImageUrlSrc(value: string | null) {
    if (value !== null) {
      this.characterImageUrlSrc = value;
    }
  }
}
