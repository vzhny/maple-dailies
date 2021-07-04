import { Component, OnInit } from '@angular/core';
import { faBook, faCog, faColumns, faSkullCrossbones, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from './header.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  navLinks: NavLink[] = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      matchExactRouteUrl: false,
      icon: faTachometerAlt,
    },
    {
      name: 'Dailies',
      route: '/dailies',
      matchExactRouteUrl: false,
      icon: faColumns,
    },
    {
      name: 'Bosses',
      route: '/bosses',
      matchExactRouteUrl: false,
      icon: faSkullCrossbones,
    },
    {
      name: 'Guides',
      route: '/guides',
      matchExactRouteUrl: false,
      icon: faBook,
    },
    {
      name: 'Settings',
      route: '/settings',
      matchExactRouteUrl: false,
      icon: faCog,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
