import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  @Input() classes: string | null = null;
  @Input() src!: string;
  @Input() altText!: string;

  @Output() error = new EventEmitter<void>();

  hiddenClass = 'hidden';
  blockClass = 'block';
  bgCoverClass = 'bg-cover';

  imageClasses = `${this.bgCoverClass} ${this.hiddenClass}`;
  isLoaded = false;

  constructor() {}

  ngOnInit(): void {}

  imageLoaded() {
    this.imageClasses = `${this.bgCoverClass} ${this.blockClass}`;

    if (this.classes !== null) {
      this.imageClasses = `${this.imageClasses} ${this.classes}`;
    }

    this.isLoaded = true;
  }
}
