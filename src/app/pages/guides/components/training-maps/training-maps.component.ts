import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilePaths } from 'src/app/constants/file-paths-constants';
import { TableColumn } from 'src/app/framework/table/table.component';
import { CharacterInfo } from 'src/app/pages/settings/settings.component';
import { CharacterService } from 'src/app/utils/services/character.service';
import { CsvToJsonService } from 'src/app/utils/services/csv-to-json.service';
import { TrainingMapsFiltersEvent } from './components/training-maps-filters/training-maps-filters.component';

export interface TrainingMap {
  level: number | null;
  name: string | null;
  area: string | null;
  minimumForce: number | null;
  recommendedForce: number | null;
  popularity: string | null;
}

@Component({
  selector: 'app-training-maps',
  templateUrl: './training-maps.component.html',
})
export class TrainingMapsComponent implements OnInit {
  columns: TableColumn[] = [
    {
      headerTitle: 'Level',
      textAlign: 'center',
      width: '80',
    },
    {
      headerTitle: 'Area',
      textAlign: 'left',
      width: '240',
    },
    {
      headerTitle: 'Map Name',
      textAlign: 'left',
      width: '300',
    },
    {
      headerTitle: 'Min. SF/AF',
      textAlign: 'center',
    },
    {
      headerTitle: 'Rec. SF/AF',
      textAlign: 'center',
    },
    {
      headerTitle: 'Popularity',
      textAlign: 'center',
    },
  ];

  data: TrainingMap[] = [];
  filteredData: TrainingMap[] = [];

  selectedCharacterLevel = 0;
  showOnlyAboveSelectedCharacterLevelMaps = false;

  trainingMapMapper = {
    level: 'Lvl',
    name: 'Map Name',
    area: 'Area',
    minimumForce: 'Min SF/AF',
    recommendedForce: 'Rec SF/AF',
    popularity: 'Pop. (WIP)',
  };

  constructor(private csvToJsonService: CsvToJsonService<TrainingMap>) {}

  ngOnInit(): void {
    this.csvToJsonService.getResults().subscribe((data) => {
      this.data = data;
      this.filteredData = data;
    });

    this.csvToJsonService.convertCsvToJson(FilePaths.trainingMapsCsv, this.trainingMapMapper);
  }

  toggleDisplayedLevels() {
    this.showOnlyAboveSelectedCharacterLevelMaps = !this.showOnlyAboveSelectedCharacterLevelMaps;

    if (this.showOnlyAboveSelectedCharacterLevelMaps) {
      this.filteredData = this.data.filter(({ level }) => {
        return level !== null && level >= this.selectedCharacterLevel;
      });
    } else {
      this.filteredData = [...this.data];
    }
  }

  setColumnWidth(width: string | undefined) {
    if (width !== undefined) {
      if (parseInt(width) !== NaN) {
        return `${width}px`;
      } else {
        return width;
      }
    } else {
      return 'auto';
    }
  }

  // TODO: Implement the filters component and associated logic in a later update
  onFilterChanges({
    toLevel,
    fromLevel,
    minForceRequired,
    maxForceRequired,
    minRecommendedForceRequired,
    maxRecommendedForceRequired,
    popularity,
  }: TrainingMapsFiltersEvent) {}
}
