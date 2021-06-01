import { Component, OnInit } from '@angular/core';

export interface NavLink {
  name: string;
  route: string;
  matchExactRouteUrl: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
