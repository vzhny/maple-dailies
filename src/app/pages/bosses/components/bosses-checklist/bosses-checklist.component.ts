import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCircle as faCircleSolid,
  faChevronUp,
  faChevronDown,
  faEye,
  faEyeSlash,
  faPen,
  faCheck,
  faEllipsisH,
  faAngleDoubleRight,
  faCheckDouble,
  faUndo,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular, faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';

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
  completed: boolean;
}

export interface BossEvent {
  bossIndex: number;
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

export interface BossCompletionEvent {
  isWeekly: boolean;
  bossIndex: number;
  completed: boolean;
}

export interface AllBossesCompletionEvent {
  isWeekly: boolean;
  allCompleted: boolean;
}

@Component({
  selector: 'app-bosses-checklist',
  templateUrl: './bosses-checklist.component.html',
  styleUrls: ['./bosses-checklist.component.scss'],
})
export class BossesChecklistComponent implements OnInit {
  @Input() bosses: Boss[] = [];
  @Input() weekly = false;
  @Input() onDashboard = false;

  @Output() selectBoss = new EventEmitter<BossSelectionEvent>();
  @Output() bossAmountOperation = new EventEmitter<DailyBossAmountOperationEvent>();
  @Output() toggleCompletion = new EventEmitter<BossCompletionEvent>();
  @Output() toggleAllCompletion = new EventEmitter<AllBossesCompletionEvent>();

  notSelectedIcon = faCircleRegular;
  selectedIcon = faCircleSolid;

  upIcon = faChevronUp;
  downIcon = faChevronDown;

  showActionsIcon = faEllipsisH;
  hideActionsIcon = faAngleDoubleRight;

  confirmIcon = faCheck;
  editIcon = faPen;

  notCompletedIcon = faSquareRegular;
  completedSquareIcon = faSquare;

  showActions = false;
  isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSelectedBossToClear({ frequency, perWeekAmount, bossCrystalMesos, selected }: Boss, index: number) {
    this.selectBoss.emit({
      bossIndex: index,
      frequency,
      perWeekAmount,
      bossCrystalMesos,
      selected: !selected,
    });
  }

  incrementPerWeekAmount({ perWeekAmount, bossCrystalMesos, selected }: Boss, index: number) {
    this.bossAmountOperation.emit({
      bossIndex: index,
      perWeekAmount,
      bossCrystalMesos,
      operation: 'increment',
      selected,
    });
  }

  decrementPerWeekAmount({ perWeekAmount, bossCrystalMesos, selected }: Boss, index: number) {
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

  completeBoss(boss: Boss, index: number) {
    if (!this.isEditing && boss.selected) {
      this.toggleCompletion.emit({
        isWeekly: this.weekly,
        bossIndex: index,
        completed: !boss.completed,
      });
    }
  }

  completeAllBosses(allCompleted: boolean) {
    this.toggleAllCompletion.emit({
      isWeekly: this.weekly,
      allCompleted,
    });
  }

  toggleVisibleBosses() {
    this.isEditing = !this.isEditing;
  }

  getToggleDailiesTooltip() {
    if (this.bosses.filter((boss) => boss.selected).length === 0) {
      return 'Select bosses first!';
    } else {
      return `${this.completedList ? 'Reset' : 'Complete'} all bosses`;
    }
  }

  get selectedBosses() {
    return this.bosses.filter((boss) => boss.selected);
  }

  get completedList() {
    return this.selectedBosses.length > 0 ? this.selectedBosses.filter((boss) => !boss.completed).length === 0 : false;
  }

  get amountOfSelectedBosses() {
    if (this.weekly) {
      return this.selectedBosses.length;
    } else {
      return this.selectedBosses.reduce((total, boss) => {
        total += boss.perWeekAmount;

        return total;
      }, 0);
    }
  }

  get amountOfEarnedMesos() {
    return this.selectedBosses.reduce((amount, boss) => {
      if (boss.selected && boss.completed) {
        amount += boss.bossCrystalMesos;
      }

      return amount;
    }, 0);
  }
}
