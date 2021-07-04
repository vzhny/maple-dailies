import { Component, OnInit } from '@angular/core';
import { faCode, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'src/app/layout/header/header.types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settingsNavLinks: NavLink[] = [
    {
      name: 'Manage Characters',
      route: 'manage-characters',
      matchExactRouteUrl: false,
      icon: faUsers,
    },
    {
      name: 'About',
      route: 'about',
      matchExactRouteUrl: false,
      icon: faCode,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
