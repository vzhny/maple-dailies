import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CharacterService } from 'src/app/utils/character.service';
import { CharacterInfo } from '../settings/settings.component';
import { BossesChecklists, BossService } from './boss.service';
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
  selectedCharacter: CharacterInfo | null = null;
  bossesChecklists: BossesChecklists | null = null;

  constructor(private bossService: BossService, private characterService: CharacterService) {}

  ngOnInit(): void {
    combineLatest([this.characterService.watchSelectedCharacter(), this.bossService.watchBossesChecklists()]).subscribe(
      ([character, checklists]) => {
        this.selectedCharacter = character;

        if (character !== null && checklists !== null) {
          const selectedCharacterBossChecklists = checklists.find((checklist) => checklist.characterId === character.id);

          if (selectedCharacterBossChecklists !== undefined) {
            this.bossesChecklists = selectedCharacterBossChecklists;
          } else {
            this.bossesChecklists = {
              ...this.bossService.getDefaultBossesChecklists(),
              characterId: character.id,
            };

            this.saveBossesChecklists();
          }
        } else {
          this.bossesChecklists = null;
        }
      }
    );
  }

  onSelectBoss({ bossIndex, frequency, perWeekAmount, bossCrystalMesos, selected }: BossSelectionEvent) {
    if (this.bossesChecklists !== null) {
      switch (frequency) {
        case 'daily':
          this.bossesChecklists.dailyBosses[bossIndex].selected = selected;
          break;
        case 'weekly':
          this.bossesChecklists.weeklyBosses[bossIndex].selected = selected;
          break;
        default:
          this.bossesChecklists.monthlyBosses[bossIndex].selected = selected;
          break;
      }

      if (selected) {
        if (frequency === 'daily') {
          this.bossesChecklists.totalAmountOfPowerCrystals += perWeekAmount;
          this.bossesChecklists.totalWeeklyMesos += perWeekAmount * bossCrystalMesos;
        } else {
          this.bossesChecklists.totalAmountOfPowerCrystals += 1;
          this.bossesChecklists.totalWeeklyMesos += bossCrystalMesos;
        }
      } else {
        if (frequency === 'daily') {
          this.bossesChecklists.totalAmountOfPowerCrystals -= perWeekAmount;
          this.bossesChecklists.totalWeeklyMesos -= perWeekAmount * bossCrystalMesos;
        } else {
          this.bossesChecklists.totalAmountOfPowerCrystals -= 1;
          this.bossesChecklists.totalWeeklyMesos -= bossCrystalMesos;
        }
      }

      this.saveBossesChecklists();
    }
  }

  onBossAmountOperation({ bossIndex, perWeekAmount, bossCrystalMesos, operation, selected }: DailyBossAmountOperationEvent) {
    if (this.bossesChecklists !== null) {
      if (selected) {
        switch (operation) {
          case 'increment':
            if (perWeekAmount < 7) {
              this.bossesChecklists.dailyBosses[bossIndex].perWeekAmount += 1;
              this.bossesChecklists.totalWeeklyMesos += bossCrystalMesos;
              this.bossesChecklists.totalAmountOfPowerCrystals += 1;
            }
            break;
          default:
            if (perWeekAmount > 1) {
              this.bossesChecklists.dailyBosses[bossIndex].perWeekAmount -= 1;
              this.bossesChecklists.totalWeeklyMesos -= bossCrystalMesos;
              this.bossesChecklists.totalAmountOfPowerCrystals -= 1;
            }
            break;
        }
      }

      this.saveBossesChecklists();
    }
  }

  onToggleCompletion({ isWeekly, bossIndex, completed }: BossCompletionEvent) {
    if (this.bossesChecklists !== null) {
      if (isWeekly) {
        this.bossesChecklists.weeklyBosses[bossIndex].completed = completed;
      } else {
        this.bossesChecklists.dailyBosses[bossIndex].completed = completed;
      }

      this.saveBossesChecklists();
    }
  }

  onAllCompletion({ isWeekly, allCompleted }: AllBossesCompletionEvent) {
    if (this.bossesChecklists !== null) {
      if (isWeekly) {
        this.bossesChecklists.weeklyBosses.forEach((boss) => (boss.completed = allCompleted));
      } else {
        this.bossesChecklists.dailyBosses.forEach((boss) => (boss.completed = allCompleted));
      }

      this.saveBossesChecklists();
    }
  }

  actualWeeklyMesosEarned() {
    if (this.bossesChecklists !== null) {
      const dailyActualMesosEarned = this.bossesChecklists.dailyBosses.reduce((total, boss) => {
        if (boss.selected && boss.completed) {
          total += boss.bossCrystalMesos;
        }

        return total;
      }, 0);

      const weeklyActualMesosEarned = this.bossesChecklists.weeklyBosses.reduce((total, boss) => {
        if (boss.selected && boss.completed) {
          total += boss.bossCrystalMesos;
        }

        return total;
      }, 0);

      return dailyActualMesosEarned + weeklyActualMesosEarned;
    } else {
      return 0;
    }
  }

  getPercentageOfActuallyEarnedMesos() {
    if (this.bossesChecklists !== null) {
      const percentage = Math.round((this.actualWeeklyMesosEarned() / this.bossesChecklists.totalWeeklyMesos) * 100);
      return `${percentage}%`;
    } else {
      return '0%';
    }
  }

  private saveBossesChecklists() {
    if (this.selectedCharacter && this.bossesChecklists !== null) {
      this.bossService.saveCharacterBossChecklists(this.selectedCharacter.id, this.bossesChecklists);
    }
  }
}
