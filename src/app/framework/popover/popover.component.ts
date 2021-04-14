import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { createPopper, Instance, Placement } from '@popperjs/core';

// TODO: finish implementing the popper component
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements AfterViewInit {
  @Input() placement: Placement = 'auto';

  @ViewChild('popoverBase') popoverBase!: ElementRef;
  @ViewChild('popoverContent') popoverContent!: ElementRef;

  showEvents = ['mouseenter', 'focus'];
  hideEvents = ['mouseleave', 'blur'];

  popper!: Instance;

  constructor() {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  ngAfterViewInit() {
    this.popper = createPopper(
      this.popoverBase.nativeElement,
      this.popoverContent.nativeElement,
      {
        placement: this.placement,
      }
    );

    this.showEvents.forEach((event) => {
      this.popoverBase.nativeElement.addEventListener(event, this.show);
    });

    this.hideEvents.forEach((event) => {
      this.popoverBase.nativeElement.addEventListener(event, this.hide);
    });
  }

  show() {
    // Make the tooltip visible
    this.popoverContent.nativeElement.setAttribute('data-show', '');

    // Enable the event listeners
    this.popper.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: true }],
    });

    // Update its position
    this.popper.update();
  }

  hide() {
    // Hide the tooltip
    this.popoverContent.nativeElement.removeAttribute('data-show');

    // Disable the event listeners
    this.popper.setOptions({
      modifiers: [{ name: 'eventListeners', enabled: false }],
    });
  }
}
