import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAsterisk, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CharacterService } from 'src/app/utils/services/character.service';
import { CharacterInfo } from '../../settings.component';

@Component({
  selector: 'app-add-character-form',
  templateUrl: './add-character-form.component.html',
  styleUrls: ['./add-character-form.component.scss'],
})
export class AddCharacterFormComponent implements OnInit, OnChanges {
  @Input() characterInfo!: CharacterInfo | null;
  @Input() isEditing = false;
  @Output() saveCharacter = new EventEmitter<CharacterInfo>();

  characterClasses = this.characterService.getCharacterClasses();
  characterForm = this.characterService.getDefaultCharacterForm();

  infoIcon = faInfoCircle;
  requiredIcon = faAsterisk;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditing && this.characterInfo !== null) {
      this.characterForm.patchValue(this.characterInfo);
    } else {
      this.characterForm = this.characterService.getDefaultCharacterForm();
    }
  }

  onSaveCharacter() {
    this.saveCharacter.emit(this.characterForm.value);
  }

  resetForm() {
    this.characterForm = this.characterService.getDefaultCharacterForm();
  }

  get characterLevel() {
    if (this.characterForm !== null) {
      return this.characterForm.controls['level'];
    } else {
      return new FormControl(null);
    }
  }
}
