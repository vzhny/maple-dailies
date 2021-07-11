import { Component, Input, OnInit } from '@angular/core';
import { ButtonColor } from './button.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() width = 'auto';
  @Input() color!: ButtonColor;

  lightTextColor = 'text-base-content';
  darkTextColor = 'text-base-300';

  buttonClasses = `btn-primary ${this.darkTextColor}`;
  buttonWidth = 'auto';

  constructor() {}

  ngOnInit(): void {
    this.buttonClasses = this.getButtonClasses();
    this.buttonWidth = this.setWidth();
  }

  getButtonClasses() {
    switch (this.color) {
      case 'secondary':
        return `btn-secondary text-secondary-content`;
      case 'success':
        return `btn-success ${this.darkTextColor}`;
      case 'info':
        return `btn-info ${this.darkTextColor}`;
      case 'warning':
        return `btn-warning ${this.darkTextColor}`;
      case 'danger':
        return `btn-error ${this.darkTextColor}`;
      case 'outline':
        return `btn-outline ${this.lightTextColor}`;
      case 'ghost':
        return `btn-ghost ${this.lightTextColor}`;
      default:
        return `btn-primary text-primary-content`;
    }
  }

  setWidth() {
    if (isNaN(parseInt(this.width))) {
      return this.width;
    } else {
      return `${this.width}px`;
    }
  }
}
