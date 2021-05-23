import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BossesRoutingModule } from './bosses-routing.module';
import { BossesComponent } from './bosses.component';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { BossesChecklistComponent } from './components/bosses-checklist/bosses-checklist.component';
import { CustomPipesModule } from 'src/app/utils/pipes/custom-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BossesComponent, BossesChecklistComponent],
  imports: [CommonModule, BossesRoutingModule, FrameworkModule, FontAwesomeModule, CustomPipesModule],
})
export class BossesModule {}
