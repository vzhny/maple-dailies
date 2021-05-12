import { Component, OnInit } from '@angular/core';
import { BossesService } from './bosses.service';
import {
  Boss,
  AllBossesCompletionEvent,
  BossSelectionEvent,
  DailyBossAmountOperationEvent,
  BossCompletionEvent,
} from './components/bosses-checklist/bosses-checklist.component';

@Component({
  selector: 'app-bosses',
  templateUrl: './bosses.component.html',
  styleUrls: ['./bosses.component.scss'],
})
export class BossesComponent implements OnInit {
  dailyBosses: Boss[] = [];
  weeklyBosses: Boss[] = [];
  monthlyBosses: Boss[] = [];

  totalWeeklyMesos = 0;
  totalAmountOfPowerCrystals = 0;

  constructor(private bossesService: BossesService) {}

  ngOnInit(): void {
    this.bossesService.watchBossesChecklists().subscribe((checklists) => {
      if (checklists !== null) {
        this.dailyBosses = checklists.dailyBosses;
        this.weeklyBosses = checklists.weeklyBosses;
        this.monthlyBosses = checklists.monthlyBosses;

        this.totalWeeklyMesos = checklists.totalWeeklyMesos;
        this.totalAmountOfPowerCrystals = checklists.totalAmountOfPowerCrystals;
      }
    });
  }

  onSelectBoss({
    bossIndex,
    frequency,
    perWeekAmount,
    bossCrystalMesos,
    selected,
  }: BossSelectionEvent) {
    switch (frequency) {
      case 'daily':
        this.dailyBosses[bossIndex].selected = selected;
        break;
      case 'weekly':
        this.weeklyBosses[bossIndex].selected = selected;
        break;
      default:
        this.monthlyBosses[bossIndex].selected = selected;
        break;
    }

    if (selected) {
      if (frequency === 'daily') {
        this.totalAmountOfPowerCrystals += perWeekAmount;
        this.totalWeeklyMesos += perWeekAmount * bossCrystalMesos;
      } else {
        this.totalAmountOfPowerCrystals += 1;
        this.totalWeeklyMesos += bossCrystalMesos;
      }
    } else {
      if (frequency === 'daily') {
        this.totalAmountOfPowerCrystals -= perWeekAmount;
        this.totalWeeklyMesos -= perWeekAmount * bossCrystalMesos;
      } else {
        this.totalAmountOfPowerCrystals -= 1;
        this.totalWeeklyMesos -= bossCrystalMesos;
      }
    }

    this.saveBossesChecklists();
  }

  onBossAmountOperation({
    bossIndex,
    perWeekAmount,
    bossCrystalMesos,
    operation,
    selected,
  }: DailyBossAmountOperationEvent) {
    if (selected) {
      switch (operation) {
        case 'increment':
          if (perWeekAmount < 7) {
            this.dailyBosses[bossIndex].perWeekAmount += 1;
            this.totalWeeklyMesos += bossCrystalMesos;
            this.totalAmountOfPowerCrystals += 1;
          }
          break;
        default:
          if (perWeekAmount > 1) {
            this.dailyBosses[bossIndex].perWeekAmount -= 1;
            this.totalWeeklyMesos -= bossCrystalMesos;
            this.totalAmountOfPowerCrystals -= 1;
          }
          break;
      }
    }

    this.saveBossesChecklists();
  }

  onToggleCompletion({ isWeekly, bossIndex, completed }: BossCompletionEvent) {
    if (isWeekly) {
      this.weeklyBosses[bossIndex].completed = completed;
    } else {
      this.dailyBosses[bossIndex].completed = completed;
    }

    this.saveBossesChecklists();
  }

  onAllCompletion({ isWeekly, allCompleted }: AllBossesCompletionEvent) {
    if (isWeekly) {
      this.weeklyBosses.forEach((boss) => (boss.completed = allCompleted));
    } else {
      this.dailyBosses.forEach((boss) => (boss.completed = allCompleted));
    }

    this.saveBossesChecklists();
  }

  private saveBossesChecklists() {
    this.bossesService.saveBossesChecklists({
      dailyBosses: this.dailyBosses,
      weeklyBosses: this.weeklyBosses,
      monthlyBosses: this.monthlyBosses,
      totalAmountOfPowerCrystals: this.totalAmountOfPowerCrystals,
      totalWeeklyMesos: this.totalWeeklyMesos,
    });
  }
}
