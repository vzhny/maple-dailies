import { Component, OnInit } from '@angular/core';
import { NavLink } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
})
export class GuidesComponent implements OnInit {
  guideNavLinks: NavLink[] = [
    {
      name: 'Arcane River Dailies',
      route: 'arcane-river-dailies',
      matchExactRouteUrl: false,
    },
    {
      name: 'Hard Muto Recipes',
      route: 'hard-muto-recipes',
      matchExactRouteUrl: false,
    },
    {
      name: 'Arcane Symbol Costs',
      route: 'arcane-symbol-costs',
      matchExactRouteUrl: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
