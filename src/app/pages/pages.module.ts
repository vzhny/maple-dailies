import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { DailiesModule } from './dailies/dailies.module';
import { BossesModule } from './bosses/bosses.module';
import { GuidesModule } from './guides/guides.module';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FrameworkModule } from '../framework/framework.module';

@NgModule({
  imports: [CommonModule, FrameworkModule, HomeModule, DashboardModule, DailiesModule, BossesModule, GuidesModule, SettingsModule],
})
export class PagesModule {}
