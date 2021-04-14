import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BossesRoutingModule } from './bosses-routing.module';
import { BossesComponent } from './bosses.component';
import { FrameworkModule } from 'src/app/framework/framework.module';

@NgModule({
  declarations: [BossesComponent],
  imports: [CommonModule, BossesRoutingModule, FrameworkModule],
})
export class BossesModule {}
