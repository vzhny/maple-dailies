import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ManageCharactersComponent } from './components/manage-characters/manage-characters.component';
import { SettingsComponent } from './settings.component';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-characters',
        pathMatch: 'full',
      },
      {
        path: 'manage-characters',
        component: ManageCharactersComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
];
