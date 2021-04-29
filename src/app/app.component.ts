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
      .watch<string>(this.darkModeEnabledKey)
      .subscribe((value: string | null) => this.setDarkModeOnDocument(value));

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

  setDarkModeOnDocument(value: string | null) {
    const darkModeEnabled = value === 'true';

    const htmlElement = document.querySelector('html');

    if (htmlElement) {
      htmlElement.className = darkModeEnabled ? 'dark' : 'light';
    }
  }
}
