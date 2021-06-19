import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';

export interface DashboardFilters {
  characterIds: number[];
  showDailies: boolean;
  showBosses: boolean;
  showArcaneDailiesInfo: boolean;
  showHardMutoRecipes: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private defaultDashboardFilters: DashboardFilters = {
    characterIds: [],
    showDailies: false,
    showBosses: false,
    showArcaneDailiesInfo: false,
    showHardMutoRecipes: false,
  };

  constructor(private localStorage: LocalStorageService, private fb: FormBuilder) {}

  watchDashboardFilters() {
    return this.localStorage.watch<DashboardFilters | null>(LocalStorageKeys.dashboardFilters);
  }

  saveDashboardFilters(filters: DashboardFilters) {
    this.localStorage.set(LocalStorageKeys.dashboardFilters, filters);
  }

  getSavedDashboardFiltersForm() {
    const form = this.fb.group({
      characterIds: new FormControl([]),
      showDailies: new FormControl(false),
      showBosses: new FormControl(false),
      showArcaneDailiesInfo: new FormControl(false),
      showHardMutoRecipes: new FormControl(false),
    });

    form.patchValue(this.dashboardFilters);

    return form;
  }

  private get dashboardFilters() {
    return this.localStorage.get<DashboardFilters>(LocalStorageKeys.dashboardFilters) ?? this.defaultDashboardFilters;
  }
}
