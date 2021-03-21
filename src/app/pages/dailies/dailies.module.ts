import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailiesRoutingModule } from './dailies-routing.module';
import { DailiesComponent } from './dailies.component';
import { DailyListComponent } from './components/daily-list/daily-list.component';

@NgModule({
  declarations: [DailiesComponent, DailyListComponent],
  imports: [CommonModule, DailiesRoutingModule],
})
export class DailiesModule {}
