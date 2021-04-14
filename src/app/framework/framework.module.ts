import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionModule } from './accordion/accordion.module';
import { TableComponent } from './table/table.component';
import { PopoverComponent } from './popover/popover.component';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';

@NgModule({
  declarations: [ContainerComponent, PopoverComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AccordionModule,
    FormModule,
    TableModule,
  ],
  exports: [AccordionModule, ContainerComponent, PopoverComponent],
})
export class FrameworkModule {}
