import { Component, Input, OnInit } from '@angular/core';

export interface MutoRecipeIngredient {
  name: string;
  amount: number;
}

export interface MutoRecipe {
  name: string;
  ingredient1: MutoRecipeIngredient;
  ingredient2: MutoRecipeIngredient;
  ingredient3?: MutoRecipeIngredient;
  ingredient4?: MutoRecipeIngredient;
  canHaveHiddenIngredientsFlg: boolean;
}

@Component({
  selector: 'app-muto-recipe',
  templateUrl: './muto-recipe.component.html',
})
export class MutoRecipeComponent implements OnInit {
  @Input() recipe!: MutoRecipe;

  constructor() {}

  ngOnInit(): void {}
}
