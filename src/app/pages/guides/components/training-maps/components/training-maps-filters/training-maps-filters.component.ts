import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainingMapsFiltersEvent } from 'src/app/pages/guides/guides.types';

@Component({
  selector: 'app-training-maps-filters',
  templateUrl: './training-maps-filters.component.html',
})
export class TrainingMapsFiltersComponent implements OnInit {
  filterForm: FormGroup | null = null;

  @Output() filter = new EventEmitter<TrainingMapsFiltersEvent>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      fromLevel: new FormControl(null, [Validators.min(0), Validators.max(300)]),
      toLevel: new FormControl(null, [Validators.min(0), Validators.max(300)]),
      minForceRequired: new FormControl(null, [Validators.min(0), Validators.max(1320)]),
      maxForceRequired: new FormControl(null, [Validators.min(0), Validators.max(1320)]),
      minRecommendedForceRequired: new FormControl(null, [Validators.min(0), Validators.max(1320)]),
      maxRecommendedForceRequired: new FormControl(null, [Validators.min(0), Validators.max(1320)]),
      popularity: new FormControl(null),
    });

    this.filterForm.valueChanges.subscribe((form) => this.filter.emit(form));
  }
}
