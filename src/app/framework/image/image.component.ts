import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() classes:
    | string
    | string[]
    | Set<string>
    | {
        [klass: string]: any;
      } = 'bg-cover';
  @Input() src!: string;
  @Input() altText!: string;

  @Output() error = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
