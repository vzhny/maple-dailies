import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKeys } from '../constants/local-storage-constants';
import { CharacterInfo } from '../pages/settings/settings.component';
import { LocalStorageService } from './local-storage.service';

export interface ClassInfo {
  name: string;
  type: string;
  fileName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private arcaneRiverAreasByLevel: { [key: number]: string } = {
    200: 'Vanishing Journey',
    210: 'Chu Chu Island',
    220: 'Lachelein',
    225: 'Arcana',
    230: 'Morass',
    235: 'Esfera',
    245: 'Tenebris - Moonbridge',
    250: 'Tenebris - Labyrinth of Suffering',
    255: 'Liminia',
  };

  private characterClasses: ClassInfo[] = [
    {
      name: 'Hero',
      type: 'Explorers',
      fileName: 'warrior.png',
    },
    {
      name: 'Dark Knight',
      type: 'Explorers',
      fileName: 'warrior.png',
    },
    {
      name: 'Paladin',
      type: 'Explorers',
      fileName: 'warrior.png',
    },
    {
      name: 'Bowmaster',
      type: 'Explorers',
      fileName: 'bowman.png',
    },
    {
      name: 'Marksman',
      type: 'Explorers',
      fileName: 'bowman.png',
    },
    {
      name: 'Pathfinder',
      type: 'Explorers',
      fileName: 'pathfinder.png',
    },
    {
      name: 'Ice/Lightning Archmage',
      type: 'Explorers',
      fileName: 'magician.png',
    },
    {
      name: 'Fire/Poison Archmage',
      type: 'Explorers',
      fileName: 'magician.png',
    },
    {
      name: 'Bishop',
      type: 'Explorers',
      fileName: 'magician.png',
    },
    {
      name: 'Night Lord',
      type: 'Explorers',
      fileName: 'thief.png',
    },
    {
      name: 'Shadower',
      type: 'Explorers',
      fileName: 'thief.png',
    },
    {
      name: 'Dual Blade',
      type: 'Explorers',
      fileName: 'dual_blade.png',
    },
    {
      name: 'Buccaneer',
      type: 'Explorers',
      fileName: 'pirate.png',
    },
    {
      name: 'Corsair',
      type: 'Explorers',
      fileName: 'pirate.png',
    },
    {
      name: 'Cannoneer',
      type: 'Explorers',
      fileName: 'cannoneer.png',
    },
    {
      name: 'Jett',
      type: 'Explorers',
      fileName: 'jett.png',
    },
    {
      name: 'Dawn Warrior',
      type: 'Cygnus Knights',
      fileName: 'warrior.png',
    },
    {
      name: 'Wind Archer',
      type: 'Cygnus Knights',
      fileName: 'bowman.png',
    },
    {
      name: 'Blaze Wizard',
      type: 'Cygnus Knights',
      fileName: 'magician.png',
    },
    {
      name: 'Night Walker',
      type: 'Cygnus Knights',
      fileName: 'thief.png',
    },
    {
      name: 'Thunder Breaker',
      type: 'Cygnus Knights',
      fileName: 'pirate.png',
    },
    {
      name: 'Mihile',
      type: 'Cygnus Knights',
      fileName: 'mihile.png',
    },
    {
      name: 'Blaster',
      type: 'Resistance',
      fileName: 'blaster.png',
    },
    {
      name: 'Wild Hunter',
      type: 'Resistance',
      fileName: 'wild_hunter.png',
    },
    {
      name: 'Battle Mage',
      type: 'Resistance',
      fileName: 'battle_mage.png',
    },
    {
      name: 'Xenon',
      type: 'Resistance',
      fileName: 'xenon.png',
    },
    {
      name: 'Mechanic',
      type: 'Resistance',
      fileName: 'mechanic.png',
    },
    {
      name: 'Demon Slayer',
      type: 'Resistance',
      fileName: 'demon_slayer.png',
    },
    {
      name: 'Demon Avenger',
      type: 'Resistance',
      fileName: 'demon_avenger.png',
    },
    {
      name: 'Aran',
      type: 'Heroes of Maple',
      fileName: 'aran.png',
    },
    {
      name: 'Mercedes',
      type: 'Heroes of Maple',
      fileName: 'mercedes.png',
    },
    {
      name: 'Evan',
      type: 'Heroes of Maple',
      fileName: 'evan.png',
    },
    {
      name: 'Luminous',
      type: 'Heroes of Maple',
      fileName: 'luminous.png',
    },
    {
      name: 'Phantom',
      type: 'Heroes of Maple',
      fileName: 'phantom.png',
    },
    {
      name: 'Shade',
      type: 'Heroes of Maple',
      fileName: 'shade.png',
    },
    {
      name: 'Kaiser',
      type: 'Nova',
      fileName: 'kaiser.png',
    },
    {
      name: 'Cadena',
      type: 'Nova',
      fileName: 'cadena.png',
    },
    {
      name: 'Angelic Buster',
      type: 'Nova',
      fileName: 'angelic_buster.png',
    },
    {
      name: 'Hayato',
      type: 'Sengoku',
      fileName: 'hayato.png',
    },
    {
      name: 'Kanna',
      type: 'Sengoku',
      fileName: 'kanna.png',
    },
    {
      name: 'Kinesis',
      type: 'Friendstory',
      fileName: 'kinesis.png',
    },
    {
      name: 'Adele',
      type: 'Flora',
      fileName: 'adele.png',
    },
    {
      name: 'Illium',
      type: 'Flora',
      fileName: 'illium.png',
    },
    {
      name: 'Ark',
      type: 'Flora',
      fileName: 'ark.png',
    },
    {
      name: 'Zero',
      type: 'Child of God',
      fileName: 'zero.png',
    },
    {
      name: 'Hoyoung',
      type: 'Anima',
      fileName: 'hoyoung.png',
    },
    {
      name: 'Beast Tamer',
      type: 'Beast Tamer',
      fileName: 'beast_tamer.png',
    },
  ];

  constructor(private localStorage: LocalStorageService, private fb: FormBuilder) {
    this.localStorage.set(LocalStorageKeys.characterList, this.characterList);
  }

  watchSelectedCharacter() {
    return this.localStorage.watch<CharacterInfo | null>(LocalStorageKeys.selectedCharacter);
  }

  watchCharacterList() {
    return this.localStorage.watch<CharacterInfo[] | null>(LocalStorageKeys.characterList);
  }

  selectCharacter(characterId: number) {
    const currentCharacterList = this.characterList;
    const listIndex = this.getCharacterListIndex(characterId);

    if (listIndex >= 0) {
      this.localStorage.set(LocalStorageKeys.selectedCharacter, this.characterList[listIndex]);

      this.localStorage.set(LocalStorageKeys.selectedCharacterId, characterId);

      this.localStorage.set(LocalStorageKeys.charImgUrl, this.characterList[listIndex].characterImgSrcUrl);
    }
  }

  saveCharacterList(list: CharacterInfo[]) {
    this.localStorage.set(LocalStorageKeys.characterList, list);
  }

  addCharacter(character: CharacterInfo) {
    const currentCharacterList = this.characterList;

    currentCharacterList.push({
      ...character,
      id: currentCharacterList.length + 2,
    });

    this.saveCharacterList(currentCharacterList);
  }

  saveCharacter(character: CharacterInfo) {
    const currentCharacterList = this.characterList;
    const listIndex = this.getCharacterListIndex(character.id);

    if (listIndex >= 0) {
      currentCharacterList[listIndex] = character;

      this.saveCharacterList(currentCharacterList);
    }

    const selectedCharacter = this.localStorage.get<CharacterInfo>(LocalStorageKeys.selectedCharacter);

    if (selectedCharacter !== null && selectedCharacter.id === character.id) {
      this.localStorage.set(LocalStorageKeys.selectedCharacter, character);
    }
  }

  deleteCharacter(characterId: number | null) {
    if (characterId !== null) {
      const currentCharacterList = this.characterList;
      const listIndex = this.getCharacterListIndex(characterId);

      if (listIndex >= 0) {
        currentCharacterList.splice(listIndex, 1);

        this.saveCharacterList(currentCharacterList);
      }

      const selectedCharacter = this.localStorage.get<CharacterInfo>(LocalStorageKeys.selectedCharacter);

      if (selectedCharacter !== null && selectedCharacter.id === characterId) {
        this.localStorage.set(LocalStorageKeys.selectedCharacter, null);
      }
    }
  }

  buildCharacterIconSrc(fileName: string) {
    return `assets/images/classes/${fileName}`;
  }

  getCharacterClasses() {
    return this.characterClasses;
  }

  getCharacterClassInfo(characterClass: string) {
    return this.characterClasses.find((info) => info.name === characterClass);
  }

  getDefaultCharacterForm() {
    return this.fb.group({
      id: new FormControl(null),
      level: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(275)]),
      class: new FormControl(null, [Validators.required]),
      characterName: new FormControl(null, [Validators.required]),
      characterImgSrcUrl: new FormControl(null),
      vanishingJourneyArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
      chuChuIslandArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
      lacheleinArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
      arcanaArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
      morassArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
      esferaArcaneSymbol: new FormGroup({
        currentLevel: new FormControl(0),
        currentExp: new FormControl(0),
      }),
    });
  }

  getAvailableArcaneRiverAreas(characterLevel: number) {
    return Object.entries(this.arcaneRiverAreasByLevel).reduce((list, [areaMinLevel, areaName]) => {
      if (characterLevel >= parseInt(areaMinLevel, 10)) {
        list.push(areaName);
      }

      return list;
    }, new Array<string>());
  }

  private getCharacterListIndex(characterId: number) {
    return this.characterList.findIndex((list) => list.id === characterId);
  }

  private get characterList() {
    const characterList = this.localStorage.get<CharacterInfo[]>(LocalStorageKeys.characterList);

    return characterList ?? [];
  }

  private get selectedCharacter() {
    return this.localStorage.get<CharacterInfo>(LocalStorageKeys.selectedCharacter);
  }
}
