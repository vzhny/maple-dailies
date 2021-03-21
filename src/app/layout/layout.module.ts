import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbNavComponent } from './breadcrumb-nav/breadcrumb-nav.component';

@NgModule({
  declarations: [HeaderComponent, BreadcrumbNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, BreadcrumbNavComponent],
})
export class LayoutModule {}
