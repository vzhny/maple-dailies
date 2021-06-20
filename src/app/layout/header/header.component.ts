import { Component, OnInit } from '@angular/core';
import { NavLink } from './header.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  navLinks: NavLink[] = [
    {
      name: 'Home',
      route: '/',
      matchExactRouteUrl: true,
    },
    {
      name: 'Dashboard',
      route: '/dashboard',
      matchExactRouteUrl: false,
    },
    {
      name: 'Dailies',
      route: '/dailies',
      matchExactRouteUrl: false,
    },
    {
      name: 'Bosses',
      route: '/bosses',
      matchExactRouteUrl: false,
    },
    {
      name: 'Guides',
      route: '/guides',
      matchExactRouteUrl: false,
    },
    {
      name: 'Settings',
      route: '/settings',
      matchExactRouteUrl: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
