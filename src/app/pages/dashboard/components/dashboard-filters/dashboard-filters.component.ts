import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { CharacterInfo } from 'src/app/pages/settings/settings.types';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';
import { DashboardService } from '../../dashboard.service';
import { DashboardFilters } from '../../dashboard.types';

@Component({
  selector: 'app-dashboard-filters',
  templateUrl: './dashboard-filters.component.html',
})
export class DashboardFiltersComponent implements OnInit {
  @Input() characterList: CharacterInfo[] = [];
  selectedCharacter: CharacterInfo | null = null;
  filterForm: FormGroup | null = null;

  constructor(private localStorage: LocalStorageService, private dashboardService: DashboardService) {
    this.saveDashboardFilters = this.saveDashboardFilters.bind(this);
  }

  ngOnInit(): void {
    this.filterForm = this.dashboardService.getSavedDashboardFiltersForm();

    this.filterForm.valueChanges.subscribe((filters: DashboardFilters) => {
      this.saveDashboardFilters(filters);
    });
  }

  saveDashboardFilters(filters: DashboardFilters) {
    this.dashboardService.saveDashboardFilters(filters);
  }

  get showDailies() {
    if (this.filterForm !== null) {
      return this.filterForm.get('showDailies') as FormControl;
    } else {
      return new FormControl(null);
    }
  }

  get showBosses() {
    if (this.filterForm !== null) {
      return this.filterForm.get('showBosses') as FormControl;
    } else {
      return new FormControl(null);
    }
  }

  get showArcaneDailiesInfo() {
    if (this.filterForm !== null) {
      return this.filterForm.get('showArcaneDailiesInfo') as FormControl;
    } else {
      return new FormControl(null);
    }
  }

  get showHardMutoRecipes() {
    if (this.filterForm !== null) {
      return this.filterForm.get('showHardMutoRecipes') as FormControl;
    } else {
      return new FormControl(null);
    }
  }
}
