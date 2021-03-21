import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/framework/table/table.component';
import { DisplayService } from 'src/app/utils/display.service';
import { NumberService } from 'src/app/utils/number.service';

interface ArcaneSymbolInfo {
  level: number;
  totalSymbols: number | null;
  symbolsToNextLevel: number | null;
  totalMesosUsed: number | null;
  mesosToNextLevel: number | null;
}

@Component({
  selector: 'app-arcane-symbol-costs',
  templateUrl: './arcane-symbol-costs.component.html',
  styleUrls: ['./arcane-symbol-costs.component.scss'],
})
export class ArcaneSymbolCostsComponent implements OnInit {
  columns: TableColumn[] = [
    {
      headerTitle: 'Level',
      headerAlign: 'center',
      property: 'level',
    },
    {
      headerTitle: 'Total Symbols',
      headerAlign: 'center',
      property: 'totalSymbols',
      format: this.displayService.displayCurrency,
    },
    {
      headerTitle: 'Symbols to Next Level',
      headerAlign: 'center',
      property: 'symbolsToNextLevel',
    },
    {
      headerTitle: 'Total Mesos Used',
      headerAlign: 'center',
      property: 'totalMesosUsed',
      format: this.displayService.displayCurrency,
    },
    {
      headerTitle: 'Mesos to Next Level',
      headerAlign: 'center',
      property: 'mesosToNextLevel',
      format: this.displayService.displayCurrency,
    },
  ];

  vjData: ArcaneSymbolInfo[] = [];

  nonVjData: ArcaneSymbolInfo[] = [];

  constructor(
    private displayService: DisplayService,
    private numberService: NumberService
  ) {}

  ngOnInit(): void {
    const levelRange = this.numberService.generateNumberRange(1, 20);
    const isVanishingJourney = true;

    this.vjData = this.buildArcaneInfoData(this.vjData, isVanishingJourney);
    this.nonVjData = this.buildArcaneInfoData(
      this.nonVjData,
      !isVanishingJourney
    );
  }

  buildArcaneInfoData(array: ArcaneSymbolInfo[], isVanishingJourney: boolean) {
    const levelRange = this.numberService.generateNumberRange(1, 20);

    return levelRange.reduce((list, level, index) => {
      let currentSymbolInfo: Partial<ArcaneSymbolInfo> = {};

      if (index === 0) {
        currentSymbolInfo = {
          level,
          totalSymbols: 1,
          symbolsToNextLevel: this.calculateRequiredSymbolsToLevelUp(level),
          totalMesosUsed: 0,
          mesosToNextLevel: this.calculateRequiredMesosToLevelUp(
            level,
            isVanishingJourney
          ),
        };
      } else {
        const previousSymbolInfo = list[index - 1];
        const symbolsToNextLevel = this.calculateRequiredSymbolsToLevelUp(
          level
        );
        const mesosToNextLevel = this.calculateRequiredMesosToLevelUp(
          level,
          isVanishingJourney
        );

        const previousTotalSymbols = previousSymbolInfo.totalSymbols ?? 0;
        const previousSymbolsToNextLevel =
          previousSymbolInfo.symbolsToNextLevel ?? 0;
        const previousTotalMesosUsed = previousSymbolInfo.totalMesosUsed ?? 0;
        const previousMesosToNextLevel =
          previousSymbolInfo.mesosToNextLevel ?? 0;

        const totalSymbols = previousSymbolsToNextLevel + previousTotalSymbols;
        const totalMesosUsed =
          previousMesosToNextLevel + previousTotalMesosUsed;

        currentSymbolInfo = {
          level,
          totalSymbols,
          symbolsToNextLevel,
          totalMesosUsed,
          mesosToNextLevel,
        };
      }

      list.push(currentSymbolInfo as ArcaneSymbolInfo);

      return list;
    }, array);
  }

  calculateRequiredSymbolsToLevelUp(level: number) {
    if (level === 1) {
      return 11;
    } else if (level !== 20) {
      return Math.pow(level, 2) + 11;
    } else {
      return null;
    }
  }

  calculateRequiredMesosToLevelUp(level: number, isVanishingJourney: boolean) {
    if (level !== 20) {
      if (isVanishingJourney) {
        return 2370000 + 7130000 * level;
      } else {
        return 12440000 + 6600000 * level;
      }
    } else {
      return null;
    }
  }
}
