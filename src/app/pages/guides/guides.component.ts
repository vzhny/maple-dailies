import { Component, OnInit } from '@angular/core';
import { faGlobe, faInfo, faMap, faUtensils } from '@fortawesome/free-solid-svg-icons';
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
      name: 'Maple Info Corner',
      route: 'maple-info-corner',
      matchExactRouteUrl: false,
      icon: faInfo,
    },
    // Commented out due to maple info corner only being http and being unable to load when app is built
    // {
    //   name: 'Maple Info Corner',
    //   route: 'maple-info-corner',
    //   matchExactRouteUrl: false,
    //   icon: faInfo,
    // },
  ];

  constructor() {}

  ngOnInit(): void {}
}
