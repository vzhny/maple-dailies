import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionComponent } from './accordion/accordion.component';
import { TableComponent } from './table/table.component';
import { PopoverComponent } from './popover/popover.component';
import { FormModule } from './form/form.module';
import { TableModule } from './table/table.module';
import { ModalComponent } from './modal/modal.component';
import { AccordionItemComponent } from './accordion/accordion-item/accordion-item.component';
import { AccordionModule } from './accordion/accordion.module';
import { ContainerModule } from './container/container.module';
import { ModalModule } from './modal/modal.module';
import { PopoverModule } from './popover/popover.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    AccordionModule,
    ButtonModule,
    ContainerModule,
    FormModule,
    ModalModule,
    PopoverModule,
    TableModule,
  ],
})
export class FrameworkModule {}
