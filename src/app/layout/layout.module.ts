import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbNavComponent } from './breadcrumb-nav/breadcrumb-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FrameworkModule } from '../framework/framework.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TippyModule } from '@ngneat/helipopper';
import { CharacterSelectorComponent } from './footer/components/character-selector/character-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [HeaderComponent, BreadcrumbNavComponent, FooterComponent, CharacterSelectorComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, NgSelectModule, ReactiveFormsModule, FormsModule, TippyModule, FrameworkModule],
  exports: [HeaderComponent, BreadcrumbNavComponent, FooterComponent],
})
export class LayoutModule {}
