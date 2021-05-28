import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faInfoCircle, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageKeys } from 'src/app/constants/local-storage-constants';
import { ModalService } from 'src/app/framework/modal/modal.service';
import { TableColumn, TableData } from 'src/app/framework/table/table.component';
import { ArcaneSymbolInfo, ArcaneSymbolService } from 'src/app/utils/arcane-symbol.service';
import { CharacterService } from 'src/app/utils/character.service';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { DailyService } from '../dailies/daily.service';

export interface ArcaneSymbol {
  currentLevel: number;
  currentExp: number;
}

export interface CharacterInfo {
  id: number;
  level: number;
  class: string;
  characterName: string;
  characterImgSrcUrl: string;
  vanishingJourneyArcaneSymbol: ArcaneSymbol;
  chuChuIslandArcaneSymbol: ArcaneSymbol;
  lacheleinArcaneSymbol: ArcaneSymbol;
  arcanaArcaneSymbol: ArcaneSymbol;
  morassArcaneSymbol: ArcaneSymbol;
  esferaArcaneSymbol: ArcaneSymbol;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  columns: TableColumn[] = [
    {
      headerTitle: '',
      textAlign: 'center',
    },
    {
      headerTitle: 'Level',
      textAlign: 'center',
    },
    {
      headerTitle: '',
      textAlign: 'center',
      width: '80',
    },
    {
      headerTitle: 'Class',
      textAlign: 'center',
    },
    {
      headerTitle: 'Character Name',
      textAlign: 'center',
    },
    {
      headerTitle: 'VJ',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: 'Chu Chu',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: 'Lachelein',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: 'Arcana',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: 'Morass',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: 'Esfera',
      textAlign: 'center',
      width: '120',
    },
    {
      headerTitle: '',
      textAlign: 'center',
      width: '120',
    },
  ];

  data: CharacterInfo[] = [];
  symbolData: ArcaneSymbolInfo[] = [];

  selectedCharacter: CharacterInfo | null = null;
  selectedCharacterId: number | null = null;
  characterToDelete: CharacterInfo | null = null;

  isEditing = false;

  editIcon = faPen;
  deleteIcon = faTimes;
  infoIcon = faInfoCircle;

  addCharacterModalId = 'addCharacterModalId';
  deleteCharacterModalId = 'deleteCharacterModalId';

  constructor(
    private localStorage: LocalStorageService,
    private modalService: ModalService,
    private arcaneSymbolService: ArcaneSymbolService,
    private characterService: CharacterService,
    private dailyService: DailyService
  ) {}

  ngOnInit(): void {
    this.characterService.watchCharacterList().subscribe((list) => {
      if (list !== null) {
        this.data = list;
      }
    });

    this.characterService.watchSelectedCharacter().subscribe((character) => {
      if (character !== null) {
        this.selectedCharacterId = character.id;
      }
    });

    this.symbolData = this.arcaneSymbolService.buildArcaneInfoData(this.symbolData, false);
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

  selectCharacter(characterId: number) {
    const selectedCharacter = this.data.find((info) => info.id === characterId);

    if (selectedCharacter !== undefined) {
      this.selectedCharacterId = selectedCharacter.id;
      this.selectedCharacter = selectedCharacter;

      this.localStorage.set(LocalStorageKeys.selectedCharacter, selectedCharacter);

      this.localStorage.set(LocalStorageKeys.charImgUrl, selectedCharacter.characterImgSrcUrl);
    }
  }

  openCharacterModal() {
    this.isEditing = false;
    this.modalService.open(this.addCharacterModalId);
  }

  editCharacter(character: TableData) {
    this.isEditing = true;
    this.selectedCharacter = character as CharacterInfo;
    this.modalService.open(this.addCharacterModalId);
  }

  onSaveCharacter(character: CharacterInfo) {
    if (character.id !== null) {
      this.characterService.saveCharacter(character);
    } else {
      this.characterService.addCharacter(character);
    }

    this.modalService.close(this.addCharacterModalId);
  }

  deleteCharacter(character: TableData) {
    this.characterToDelete = character as CharacterInfo;
    this.modalService.open(this.deleteCharacterModalId);
  }

  confirmDeleteCharacter() {
    if (this.characterToDelete !== null) {
      this.characterService.deleteCharacter(this.characterToDelete?.id);
      this.dailyService.deleteAllAssociatedDailiesLists(this.characterToDelete?.id);
      this.characterToDelete = null;
      this.modalService.close(this.deleteCharacterModalId);
    }
  }

  calculateSymbolExperiencePercentage({ currentLevel, currentExp }: ArcaneSymbol) {
    const defaultPercentage = '0%';
    const symbolData = this.symbolData[currentLevel - 1];

    if (symbolData) {
      const { symbolsToNextLevel } = symbolData;

      if (symbolsToNextLevel !== null) {
        const percentage = Math.round((currentExp / symbolsToNextLevel) * 100);
        return `${percentage}%`;
      } else {
        return defaultPercentage;
      }
    } else {
      return defaultPercentage;
    }
  }

  getCharacterIcon(characterClass: string) {
    const info = this.characterService.getCharacterClassInfo(characterClass);

    return this.characterService.buildCharacterIconSrc(info !== undefined ? info.fileName : 'beginner.png');
  }
}
