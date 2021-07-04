import { Component, Input, OnInit } from '@angular/core';
import { FilePaths } from 'src/app/constants/file-paths-constants';

@Component({
  selector: 'app-home-details-hero-section',
  templateUrl: './home-details-hero-section.component.html',
})
export class HomeDetailsHeroSectionComponent implements OnInit {
  @Input() headerTitle!: string;
  @Input() bodyText!: string;
  @Input() additionalBodyText: string | null = null;
  @Input() imageSrc: string | null = null;
  @Input() arcaneMapIndex!: number;

  arcaneRiverTownMapFilePaths = FilePaths.arcaneRiverTownMaps;

  constructor() {}

  ngOnInit(): void {}

  getHeroBackgroundImage() {
    return `url('${this.arcaneRiverTownMapFilePaths[this.arcaneMapIndex]}')`;
  }
}
