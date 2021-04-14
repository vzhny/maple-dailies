import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AccordionService } from '../accordion.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  @Input() headerTitle!: string;
  @Input() fluidContent = false;
  @Input() expanded = false;

  isExpanded = false;
  expandIcon = faChevronDown;
  collapseIcon = faChevronUp;

  constructor(private accordionService: AccordionService) {}

  ngOnInit(): void {
    this.accordionService.collapse.subscribe((event) => {
      if (event.headerTitle !== this.headerTitle) {
        this.isExpanded = !event.collapsed;
      }
    });

    this.isExpanded = this.expanded;
  }

  toggleAccordion() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.accordionService.collapseAll(this.headerTitle);
    }
  }
}
