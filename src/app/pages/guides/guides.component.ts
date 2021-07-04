import { Component, OnInit } from '@angular/core';
import { faGlobe, faMap, faUtensils } from '@fortawesome/free-solid-svg-icons';
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
  ];

  constructor() {}

  ngOnInit(): void {}
}
