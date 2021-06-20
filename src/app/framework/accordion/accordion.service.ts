import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollapseEvent } from './accordion.types';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  private $collapse = new BehaviorSubject<CollapseEvent>({
    headerTitle: null,
    collapsed: true,
  });

  collapse = this.$collapse.asObservable();

  constructor() {}

  expandAll(headerTitle: string) {
    this.$collapse.next({
      headerTitle,
      collapsed: false,
    });
  }

  collapseAll(headerTitle: string | null) {
    if (headerTitle !== null) {
      this.$collapse.next({
        headerTitle,
        collapsed: true,
      });
    }
  }
}
