import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionModule } from './accordion/accordion.module';
import { TableComponent } from './table/table.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [ContainerComponent, TableComponent, PopoverComponent],
  imports: [CommonModule, FontAwesomeModule, AccordionModule],
  exports: [
    AccordionModule,
    ContainerComponent,
    TableComponent,
    PopoverComponent,
  ],
})
export class FrameworkModule {}
