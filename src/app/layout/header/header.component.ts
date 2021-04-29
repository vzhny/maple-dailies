import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { ModalService } from 'src/app/framework/modal/modal.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';

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
  form: FormGroup | null = null;
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

  constructor(
    private modalService: ModalService,
    private localStorage: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      imageUrl: new FormControl(
        this.localStorage.get<string>(LocalStorageKeys.charImgUrl)
      ),
    });
  }

  openSettingsModal() {
    this.modalService.open(this.settingsModalId);
  }

  saveSettings() {
    if (this.imageUrl.value !== null) {
      this.localStorage.set(LocalStorageKeys.charImgUrl, this.imageUrl.value);
    }

    this.modalService.close(this.settingsModalId);
  }

  get imageUrl() {
    if (this.form !== null) {
      return this.form.controls['imageUrl'];
    } else {
      return new FormControl(null);
    }
  }
}
