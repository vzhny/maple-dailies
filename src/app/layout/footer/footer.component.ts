import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlasses, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/utils/local-storage.service';

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

  darkModeEnabled = true;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.darkModeEnabled = this.localStorage.get('darkModeEnabled') === 'true';
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;

    this.localStorage.set('darkModeEnabled', `${this.darkModeEnabled}`);
  }
}