import { Routes } from '@angular/router';
import { BossesComponent } from './pages/bosses/bosses.component';
import { DailiesComponent } from './pages/dailies/dailies.component';
import { GuidesComponent } from './pages/guides/guides.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'dailies',
    loadChildren: () => import('./pages/dailies/dailies.module').then((m) => m.DailiesModule),
  },
  {
    path: 'bosses',
    loadChildren: () => import('./pages/bosses/bosses.module').then((m) => m.BossesModule),
  },
  {
    path: 'guides',
    loadChildren: () => import('./pages/guides/guides.module').then((m) => m.GuidesModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
];
