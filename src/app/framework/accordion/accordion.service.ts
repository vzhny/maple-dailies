import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CollapseEvent {
  headerTitle: string | null;
  collapsed: boolean;
}

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
