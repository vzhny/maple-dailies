import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/framework/modal/modal.service';

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
  ];

  settingsModalId = 'settingsModal';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openSettingsModal() {
    this.modalService.open(this.settingsModalId);
  }
}
