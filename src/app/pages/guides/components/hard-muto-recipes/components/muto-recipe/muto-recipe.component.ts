import { Component, Input, OnInit } from '@angular/core';
import { MutoRecipe } from 'src/app/pages/guides/guides.types';

@Component({
  selector: 'app-muto-recipe',
  templateUrl: './muto-recipe.component.html',
})
export class MutoRecipeComponent implements OnInit {
  @Input() recipe!: MutoRecipe;

  constructor() {}

  ngOnInit(): void {}
}
