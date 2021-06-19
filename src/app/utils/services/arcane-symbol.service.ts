import { Injectable } from '@angular/core';
import { NumberService } from './number.service';

export interface ArcaneSymbolInfo {
  level: number;
  totalSymbols: number | null;
  symbolsToNextLevel: number | null;
  totalMesosUsed: number | null;
  mesosToNextLevel: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class ArcaneSymbolService {
  constructor(private numberService: NumberService) {}

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
          mesosToNextLevel: this.calculateRequiredMesosToLevelUp(level, isVanishingJourney),
        };
      } else {
        const previousSymbolInfo = list[index - 1];
        const symbolsToNextLevel = this.calculateRequiredSymbolsToLevelUp(level);
        const mesosToNextLevel = this.calculateRequiredMesosToLevelUp(level, isVanishingJourney);

        const previousTotalSymbols = previousSymbolInfo.totalSymbols ?? 0;
        const previousSymbolsToNextLevel = previousSymbolInfo.symbolsToNextLevel ?? 0;
        const previousTotalMesosUsed = previousSymbolInfo.totalMesosUsed ?? 0;
        const previousMesosToNextLevel = previousSymbolInfo.mesosToNextLevel ?? 0;

        const totalSymbols = previousSymbolsToNextLevel + previousTotalSymbols;
        const totalMesosUsed = previousMesosToNextLevel + previousTotalMesosUsed;

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
