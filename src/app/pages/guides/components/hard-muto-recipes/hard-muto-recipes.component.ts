import { Component, Input, OnInit } from '@angular/core';
import { MutoRecipe } from './components/muto-recipe/muto-recipe.component';

@Component({
  selector: 'app-hard-muto-recipes',
  templateUrl: './hard-muto-recipes.component.html',
  styleUrls: ['./hard-muto-recipes.component.scss'],
})
export class HardMutoRecipesComponent implements OnInit {
  @Input() onDashboard = false;

  recipes: MutoRecipe[] = [
    {
      name: 'Berry Bouquet',
      ingredient1: { name: 'Fresh Mane', amount: 5 },
      ingredient2: { name: 'Crunchy Shell', amount: 5 },
      ingredient3: { name: 'Unpleasant Talon', amount: 10 },
      ingredient4: { name: 'Slurpy Fruit', amount: 1 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Dumpling Delights',
      ingredient1: { name: 'Sour Peel', amount: 5 },
      ingredient2: { name: 'Chewy Sole', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Fried Squish',
      ingredient1: { name: 'Spicy Hoof', amount: 5 },
      ingredient2: { name: 'Zesty Mane', amount: 10 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Fried Treat',
      ingredient1: { name: 'Sweet Hoof', amount: 5 },
      ingredient2: { name: 'Fresh Mane', amount: 10 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Fruit Salad',
      ingredient1: { name: 'Sour Peel', amount: 5 },
      ingredient2: { name: 'Chewy Sole', amount: 5 },
      ingredient3: { name: 'Sticky Feather', amount: 10 },
      ingredient4: { name: 'Slurpy Fruit', amount: 1 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Funky Pizza',
      ingredient1: { name: 'Spicy Hoof', amount: 5 },
      ingredient2: { name: 'Zesty Mane', amount: 5 },
      ingredient3: { name: 'Tart Fins', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Gamey Soup',
      ingredient1: { name: 'Savory Fin', amount: 5 },
      ingredient2: { name: 'Crunchy Shell', amount: 5 },
      ingredient3: { name: 'Unpleasant Talon', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Juicy Buns',
      ingredient1: { name: 'Sour Peel', amount: 5 },
      ingredient2: { name: 'Chewy Sole', amount: 5 },
      ingredient3: { name: 'Soft Shell', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Mystery Roast',
      ingredient1: { name: 'Greasy Peel', amount: 5 },
      ingredient2: { name: 'Soft Sole', amount: 5 },
      ingredient3: { name: 'Slimy Feather', amount: 10 },
      ingredient4: { name: 'Slurpy Fruit', amount: 1 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Nummy Noodles',
      ingredient1: { name: 'Sweet Hoof', amount: 5 },
      ingredient2: { name: 'Fresh Mane', amount: 5 },
      ingredient3: { name: 'Savory Fin', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Savory Stir Fry',
      ingredient1: { name: 'Greasy Peel', amount: 5 },
      ingredient2: { name: 'Soft Sole', amount: 10 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Spicy Sausage',
      ingredient1: { name: 'Zesty Mane', amount: 5 },
      ingredient2: { name: 'Soft Shell', amount: 5 },
      ingredient3: { name: 'Chewy Talon', amount: 10 },
      ingredient4: { name: 'Slurpy Fruit', amount: 1 },
      canHaveHiddenIngredientsFlg: true,
    },
    {
      name: 'Steamy Surprise',
      ingredient1: { name: 'Greasy Peel', amount: 5 },
      ingredient2: { name: 'Soft Sole', amount: 5 },
      ingredient3: { name: 'Crunchy Shell', amount: 10 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Weird Wrap',
      ingredient1: { name: 'Fresh Mane', amount: 5 },
      ingredient2: { name: 'Savory Fin', amount: 5 },
      ingredient3: { name: 'Slimy Feather', amount: 10 },
      canHaveHiddenIngredientsFlg: false,
    },
    {
      name: 'Yucky Pickles',
      ingredient1: { name: 'Zesty Mane', amount: 5 },
      ingredient2: { name: 'Tart Fins', amount: 5 },
      ingredient3: { name: 'Sticky Feather', amount: 10 },
      canHaveHiddenIngredientsFlg: false,
    },
  ];

  filteredRecipes: MutoRecipe[] = [];
  showOnlyHiddenIngredientRecipes = false;

  constructor() {}

  ngOnInit(): void {
    this.filterHiddenIngredientRecipes();
  }

  filterHiddenIngredientRecipes() {
    this.showOnlyHiddenIngredientRecipes = !this.showOnlyHiddenIngredientRecipes;

    if (this.showOnlyHiddenIngredientRecipes) {
      this.filteredRecipes = this.recipes.filter((recipe) => recipe.canHaveHiddenIngredientsFlg);
    } else {
      this.filteredRecipes = [...this.recipes];
    }
  }
}
