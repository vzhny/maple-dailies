import { Component, Input, OnInit } from '@angular/core';
import { LoaderSize } from './loader.types';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() size: LoaderSize = 'md';

  loaderClasses = 'm-2 rounded-full border-primary loader';

  constructor() {}

  ngOnInit(): void {
    this.loaderClasses = `${this.loaderClasses} ${this.setLoaderSizeClasses()}`;
  }

  setLoaderSizeClasses() {
    switch (this.size) {
      case 'sm':
        return 'w-8 w-8 border-2';
      case 'md':
        return 'w-12 h-12 border-4';
      case 'lg':
        return 'w-16 h-16 border-6';
    }
  }
}
