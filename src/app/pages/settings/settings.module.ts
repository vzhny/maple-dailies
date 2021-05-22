import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCharacterFormComponent } from './components/add-character-form/add-character-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TippyModule } from '@ngneat/helipopper';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [SettingsComponent, AddCharacterFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule,
    TippyModule,
    FrameworkModule,
  ],
})
export class SettingsModule {}
