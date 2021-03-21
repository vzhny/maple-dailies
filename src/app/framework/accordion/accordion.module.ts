import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionService } from './accordion.service';

@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AccordionComponent, AccordionItemComponent],
  providers: [AccordionService],
})
export class AccordionModule {}
