import { Component, Input, OnInit } from '@angular/core';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  btnColorClass: string =
    'bg-blue-800 text-white hover:bg-blue-700 hover:cursor-pointer';

  @Input() set color(color: ButtonColor) {
    switch (color) {
      case 'secondary':
        this.btnColorClass =
          'bg-gray-400 text-white hover:bg-gray-300 hover:cursor-pointer';
        break;
      case 'success':
        this.btnColorClass =
          'bg-green-500 text-white hover:bg-green-400 hover:cursor-pointer';
        break;
      case 'info':
        this.btnColorClass =
          'bg-blue-400 text-white hover:bg-blue-300 hover:cursor-pointer';
        break;
      case 'warning':
        this.btnColorClass =
          'bg-yellow-300 text-white hover:bg-yellow-200 hover:cursor-pointer';
        break;
      case 'danger':
        this.btnColorClass =
          'bg-red-700 text-white hover:bg-red-600 hover:cursor-pointer';
        break;
      default:
        this.btnColorClass =
          'bg-blue-800 text-white hover:bg-blue-700 hover:cursor-pointer';
        break;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
