import { Component, OnInit } from '@angular/core';
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
    },
    {
      name: 'Arcane River Dailies Info',
      route: 'arcane-river-dailies-info',
      matchExactRouteUrl: false,
    },
    {
      name: 'Hard Muto Recipes',
      route: 'hard-muto-recipes',
      matchExactRouteUrl: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
