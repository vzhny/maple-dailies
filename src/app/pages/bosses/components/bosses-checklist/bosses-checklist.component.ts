import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCircle as faCircleSolid,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';

export type BossFrequency = 'daily' | 'weekly' | 'monthly';
export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'chaos';
export type BossAmountOperation = 'increment' | 'decrement';

export interface Boss {
  name: string;
  difficulty: BossDifficulty;
  frequency: BossFrequency;
  perWeekAmount: number;
  bossCrystalMesos: number;
  selected: boolean;
}

export interface BossSelectionEvent {
  bossIndex: number;
  frequency: BossFrequency;
  perWeekAmount: number;
  bossCrystalMesos: number;
  selected: boolean;
}

export interface DailyBossAmountOperationEvent {
  bossIndex: number;
  perWeekAmount: number;
  bossCrystalMesos: number;
  operation: BossAmountOperation;
  selected: boolean;
}

@Component({
  selector: 'app-bosses-checklist',
  templateUrl: './bosses-checklist.component.html',
  styleUrls: ['./bosses-checklist.component.scss'],
})
export class BossesChecklistComponent implements OnInit {
  @Input() bosses: Boss[] = [];
  @Input() weekly = false;

  @Output() selectBoss = new EventEmitter<BossSelectionEvent>();
  @Output()
  bossAmountOperation = new EventEmitter<DailyBossAmountOperationEvent>();

  notSelectedIcon = faCircleRegular;
  selectedIcon = faCircleSolid;

  upIcon = faChevronUp;
  downIcon = faChevronDown;

  constructor() {}

  ngOnInit(): void {}

  toggleSelectedBossToClear(
    { frequency, perWeekAmount, bossCrystalMesos, selected }: Boss,
    index: number
  ) {
    this.selectBoss.emit({
      bossIndex: index,
      frequency,
      perWeekAmount,
      bossCrystalMesos,
      selected: !selected,
    });
  }

  incrementPerWeekAmount(
    { perWeekAmount, bossCrystalMesos, selected }: Boss,
    index: number
  ) {
    this.bossAmountOperation.emit({
      bossIndex: index,
      perWeekAmount,
      bossCrystalMesos,
      operation: 'increment',
      selected,
    });
  }

  decrementPerWeekAmount(
    { perWeekAmount, bossCrystalMesos, selected }: Boss,
    index: number
  ) {
    this.bossAmountOperation.emit({
      bossIndex: index,
      perWeekAmount,
      bossCrystalMesos,
      operation: 'decrement',
      selected,
    });
  }

  getBossImageFileName(name: string) {
    return name.toLowerCase().replace(' ', '-');
  }

  get amountOfSelectedBosses() {
    const selectedBosses = this.bosses.filter((boss) => boss.selected);

    if (this.weekly) {
      return selectedBosses.length;
    } else {
      return selectedBosses.reduce((total, boss) => {
        total += boss.perWeekAmount;

        return total;
      }, 0);
    }
  }
}
