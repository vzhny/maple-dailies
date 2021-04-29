import { Component, Input, OnInit } from '@angular/core';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'outline';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  baseBtnClasses = 'p-2 rounded shadow disabled:cursor-not-allowed';
  btnColorClass: string = `${this.baseBtnClasses} bg-blue-800 text-white hover:bg-blue-700 hover:cursor-pointer disabled:bg-blue-600`;

  @Input() disabled = false;
  @Input() set color(color: ButtonColor) {
    switch (color) {
      case 'secondary':
        this.btnColorClass = `${this.baseBtnClasses} bg-gray-400 text-white hover:bg-gray-300 hover:cursor-pointer disabled:bg-gray-200`;
        break;
      case 'success':
        this.btnColorClass = `${this.baseBtnClasses} bg-green-500 text-white hover:bg-green-400 hover:cursor-pointer disabled:bg-green-300`;
        break;
      case 'info':
        this.btnColorClass = `${this.baseBtnClasses} bg-blue-400 text-white hover:bg-blue-300 hover:cursor-pointer disabled:bg-blue-200`;
        break;
      case 'warning':
        this.btnColorClass = `${this.baseBtnClasses} bg-yellow-300 text-black hover:bg-yellow-200 hover:cursor-pointer disabled:bg-yellow-100`;
        break;
      case 'danger':
        this.btnColorClass = `${this.baseBtnClasses} bg-red-700 text-white hover:bg-red-600 hover:cursor-pointer disabled:bg-red-500`;
        break;
      case 'outline':
        this.btnColorClass = `${this.baseBtnClasses} text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:cursor-pointer disabled:bg-gray-200 dark:disabled:bg-gray-500`;
        break;
      default:
        this.btnColorClass = `${this.baseBtnClasses} bg-blue-800 text-white hover:bg-blue-700 hover:cursor-pointer disabled:bg-blue-600`;
        break;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
