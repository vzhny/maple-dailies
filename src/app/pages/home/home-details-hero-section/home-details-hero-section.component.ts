import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-details-hero-section',
  templateUrl: './home-details-hero-section.component.html',
})
export class HomeDetailsHeroSectionComponent implements OnInit {
  @Input() headerTitle!: string;
  @Input() bodyText!: string;
  @Input() imageSrc: string | null = null;
  @Input() imageFirst = false;

  constructor() {}

  ngOnInit(): void {}
}
