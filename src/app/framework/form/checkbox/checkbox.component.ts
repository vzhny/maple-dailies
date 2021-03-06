import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: boolean;
  @Input() control: FormControl | null = null;

  constructor() {}

  ngOnInit(): void {}
}
