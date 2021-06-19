import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlasses, faMoon, faSun, faUsers } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import { ResetTimerService } from 'src/app/utils/services/reset-timer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  homepageIcon = faGlasses;
  githubIcon = faGithub;
  lightModeIcon = faSun;
  darkModeIcon = faMoon;
  characterSelectIcon = faUsers;

  darkModeEnabled = true;

  remainingTime: string | null = null;

  constructor(private localStorage: LocalStorageService, private resetTimerService: ResetTimerService) {}

  ngOnInit(): void {
    const darkModeEnabled = this.localStorage.get<boolean>('darkModeEnabled');

    if (darkModeEnabled !== null) {
      this.darkModeEnabled = darkModeEnabled;
    }

    this.resetTimerService.remainingTime.subscribe((remainingTime) => (this.remainingTime = remainingTime));
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;

    this.localStorage.set('darkModeEnabled', this.darkModeEnabled);
  }
}
