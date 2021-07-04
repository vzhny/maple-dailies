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
import { LayoutModule } from 'src/app/layout/layout.module';
import { ManageCharactersComponent } from './components/manage-characters/manage-characters.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [SettingsComponent, AddCharacterFormComponent, ManageCharactersComponent, AboutComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FontAwesomeModule,
    TippyModule,
    FrameworkModule,
    LayoutModule,
  ],
})
export class SettingsModule {}
