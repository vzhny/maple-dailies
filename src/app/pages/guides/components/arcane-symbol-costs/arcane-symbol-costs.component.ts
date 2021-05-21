import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/framework/table/table.component';
import {
  ArcaneSymbolInfo,
  ArcaneSymbolsService,
} from 'src/app/utils/arcane-symbols.service';
import { DisplayService } from 'src/app/utils/display.service';
import { NumberService } from 'src/app/utils/number.service';

@Component({
  selector: 'app-arcane-symbol-costs',
  templateUrl: './arcane-symbol-costs.component.html',
  styleUrls: ['./arcane-symbol-costs.component.scss'],
})
export class ArcaneSymbolCostsComponent implements OnInit {
  columns: TableColumn[] = [
    {
      headerTitle: 'Level',
      textAlign: 'center',
    },
    {
      headerTitle: 'Total Symbols',
      textAlign: 'center',
    },
    {
      headerTitle: 'Symbols to Next Level',
      textAlign: 'center',
    },
    {
      headerTitle: 'Total Mesos Used',
      textAlign: 'center',
    },
    {
      headerTitle: 'Mesos to Next Level',
      textAlign: 'center',
    },
  ];

  vjData: ArcaneSymbolInfo[] = [];

  nonVjData: ArcaneSymbolInfo[] = [];

  constructor(
    private displayService: DisplayService,
    private arcaneSymbolService: ArcaneSymbolsService
  ) {}

  ngOnInit(): void {
    const isVanishingJourney = true;

    this.vjData = this.arcaneSymbolService.buildArcaneInfoData(
      this.vjData,
      isVanishingJourney
    );

    this.nonVjData = this.arcaneSymbolService.buildArcaneInfoData(
      this.nonVjData,
      !isVanishingJourney
    );
  }

  displayCurrency(value: number) {
    return this.displayService.displayCurrency(value);
  }
}
