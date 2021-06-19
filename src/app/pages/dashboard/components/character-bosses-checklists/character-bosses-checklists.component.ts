import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BossesChecklists, BossService } from 'src/app/pages/bosses/boss.service';
import {
  AllBossesCompletionEvent,
  Boss,
  BossCompletionEvent,
} from 'src/app/pages/bosses/components/bosses-checklist/bosses-checklist.component';
import { CharacterInfo } from 'src/app/pages/settings/settings.component';
import { CharacterService } from 'src/app/utils/services/character.service';
import { DashboardService } from '../../dashboard.service';

interface CharacterBossesChecklistsTuple {
  character: CharacterInfo;
  bossesChecklists: BossesChecklists;
}

// TODO: move all the duplicated code below and in the bosses component to a shared abstract class/service
@Component({
  selector: 'app-character-bosses-checklists',
  templateUrl: './character-bosses-checklists.component.html',
  styleUrls: ['./character-bosses-checklists.component.scss'],
})
export class CharacterBossesChecklistsComponent implements OnInit {
  @Input() bossesChecklists: BossesChecklists[] = [];
  @Input() characterList: CharacterInfo[] = [];
  @Input() selectedCharactersIds: number[] = [];

  allBossesChecklists: BossesChecklists[] = [];
  characterBossesChecklistsTuplesList: CharacterBossesChecklistsTuple[] = [];

  constructor(private characterService: CharacterService, private bossService: BossService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.allBossesChecklists = [...this.bossesChecklists];
    this.characterBossesChecklistsTuplesList = this.generateCharacterBossesChecklistsTupleList(this.characterList);

    this.dashboardService.watchDashboardFilters().subscribe((filters) => {
      if (filters !== null) {
        const { characterIds } = filters;

        const selectedCharactersList =
          characterIds.length > 0 ? this.characterList.filter((character) => characterIds.includes(character.id)) : this.characterList;

        this.characterBossesChecklistsTuplesList = this.generateCharacterBossesChecklistsTupleList(selectedCharactersList);
      }
    });
  }

  generateCharacterBossesChecklistsTupleList(characterList: CharacterInfo[]): CharacterBossesChecklistsTuple[] {
    const tuplesList: CharacterBossesChecklistsTuple[] = [];

    return characterList.reduce((list, character) => {
      const checklists = this.bossesChecklists.find((list) => list.characterId === character.id);

      if (checklists !== undefined) {
        list.push({
          character,
          bossesChecklists: checklists,
        });
      }

      return list;
    }, tuplesList);
  }

  hasSelectedBosses(bosses: Boss[]) {
    return bosses.filter((boss) => boss.selected).length > 0;
  }

  onToggleCompletion({ isWeekly, bossIndex, completed }: BossCompletionEvent, characterId: number) {
    const tuple = this.characterBossesChecklistsTuplesList.find(({ character }) => character.id === characterId);

    if (tuple !== undefined) {
      const { bossesChecklists } = tuple;

      if (isWeekly) {
        bossesChecklists.weeklyBosses[bossIndex].completed = completed;
      } else {
        bossesChecklists.dailyBosses[bossIndex].completed = completed;
      }

      const index = this.allBossesChecklists.findIndex((checklist) => checklist.characterId === characterId);

      this.allBossesChecklists[index] = bossesChecklists;

      this.saveBossesChecklists();
    }
  }

  onAllCompletion({ isWeekly, allCompleted }: AllBossesCompletionEvent, characterId: number) {
    const tuple = this.characterBossesChecklistsTuplesList.find(({ character }) => character.id === characterId);

    if (tuple !== undefined) {
      const { bossesChecklists } = tuple;

      if (isWeekly) {
        bossesChecklists.weeklyBosses.forEach((boss) => {
          if (boss.selected) {
            boss.completed = allCompleted;
          }
        });
      } else {
        bossesChecklists.dailyBosses.forEach((boss) => {
          if (boss.selected) {
            boss.completed = allCompleted;
          }
        });
      }

      const index = this.allBossesChecklists.findIndex((checklist) => checklist.characterId === characterId);

      this.allBossesChecklists[index] = bossesChecklists;

      this.saveBossesChecklists();
    }
  }

  getCharacterIconFileName(characterClass: string) {
    const info = this.characterService.getCharacterClassInfo(characterClass);

    return this.characterService.buildCharacterIconSrc(info !== undefined ? info.fileName : 'beginner.png');
  }

  private saveBossesChecklists() {
    this.bossService.saveBossesChecklists(this.allBossesChecklists);
  }
}
