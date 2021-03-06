import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from '../header/header.types';

@Component({
  selector: 'app-breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
})
export class BreadcrumbNavComponent implements OnInit {
  @Input() navLinks: NavLink[] = [];

  constructor() {}

  ngOnInit(): void {}
}
