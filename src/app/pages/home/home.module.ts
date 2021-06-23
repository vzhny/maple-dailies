import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { HomeDetailsHeroSectionComponent } from './home-details-hero-section/home-details-hero-section.component';

@NgModule({
  declarations: [HomeComponent, HomeDetailsHeroSectionComponent],
  imports: [CommonModule, HomeRoutingModule, FrameworkModule],
})
export class HomeModule {}
