import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailiesRoutingModule } from './dailies-routing.module';
import { DailiesComponent } from './dailies.component';
import { DailyListComponent } from './components/daily-list/daily-list.component';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { FormModule } from 'src/app/framework/form/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'src/app/framework/table/table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TippyModule } from '@ngneat/helipopper';

@NgModule({
  declarations: [DailiesComponent, DailyListComponent],
  imports: [
    CommonModule,
    DailiesRoutingModule,
    ReactiveFormsModule,
    TippyModule,
    FrameworkModule,
    TableModule,
    FormModule,
    FontAwesomeModule,
  ],
  exports: [DailyListComponent],
})
export class DailiesModule {}
