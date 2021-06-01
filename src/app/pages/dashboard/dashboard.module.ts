import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { DashboardFiltersComponent } from './components/dashboard-filters/dashboard-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormModule } from 'src/app/framework/form/form.module';
import { GuidesModule } from '../guides/guides.module';
import { DailiesModule } from '../dailies/dailies.module';
import { CharacterDailiesListsComponent } from './components/character-dailies-lists/character-dailies-lists.component';
import { CharacterBossesChecklistsComponent } from './components/character-bosses-checklists/character-bosses-checklists.component';
import { BossesModule } from '../bosses/bosses.module';

@NgModule({
  declarations: [DashboardComponent, DashboardFiltersComponent, CharacterDailiesListsComponent, CharacterBossesChecklistsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FrameworkModule,
    FormModule,
    DailiesModule,
    BossesModule,
    GuidesModule,
  ],
})
export class DashboardModule {}
