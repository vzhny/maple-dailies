import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacterInfo } from 'src/app/pages/settings/settings.component';
import { CharacterService } from 'src/app/utils/character.service';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss'],
})
export class CharacterSelectorComponent implements OnInit {
  @Output() characterSelected = new EventEmitter<void>();

  characters: CharacterInfo[] = [];
  selectedCharacter: CharacterInfo | null = null;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.watchCharacterList().subscribe((characters) => {
      if (characters !== null) {
        this.characters = characters;
      }
    });

    this.characterService.watchSelectedCharacter().subscribe((character) => (this.selectedCharacter = character));
  }

  selectCharacter(character: CharacterInfo) {
    this.characterService.selectCharacter(character.id);
    this.characterSelected.emit();
  }

  getCharacterIconFileName(characterClass: string) {
    const classInfo = this.characterService.getCharacterClassInfo(characterClass);

    if (classInfo !== undefined) {
      return classInfo.fileName;
    } else {
      return 'beginner.png';
    }
  }
}
