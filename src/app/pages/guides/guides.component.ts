import { Component, OnInit } from '@angular/core';
import { faCalculator, faGlobe, faInfo, faMap, faScroll, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'src/app/layout/header/header.types';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
})
export class GuidesComponent implements OnInit {
  guideNavLinks: NavLink[] = [
    {
      name: 'Training Maps',
      route: 'training-maps',
      matchExactRouteUrl: false,
      icon: faMap,
    },
    {
      name: 'Arcane River Dailies Info',
      route: 'arcane-river-dailies-info',
      matchExactRouteUrl: false,
      icon: faGlobe,
    },
    {
      name: 'Hard Muto Recipes',
      route: 'hard-muto-recipes',
      matchExactRouteUrl: false,
      icon: faUtensils,
    },
    {
      name: 'Guild Point Cap',
      route: 'guild-point-cap',
      matchExactRouteUrl: false,
      icon: faScroll,
    },
    {
      name: 'Maple Info Corner',
      route: 'maple-info-corner',
      matchExactRouteUrl: false,
      icon: faInfo,
    },
    {
      name: `SuckHard's Calculators`,
      route: 'suckhard-calculators',
      matchExactRouteUrl: false,
      icon: faCalculator,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
