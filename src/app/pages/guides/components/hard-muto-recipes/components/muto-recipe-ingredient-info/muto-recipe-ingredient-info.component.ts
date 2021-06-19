import { Component, Input, OnInit } from '@angular/core';
import { MutoRecipeIngredient } from '../muto-recipe/muto-recipe.component';

@Component({
  selector: 'app-muto-recipe-ingredient-info',
  templateUrl: './muto-recipe-ingredient-info.component.html',
})
export class MutoRecipeIngredientInfoComponent implements OnInit {
  @Input() ingredient!: MutoRecipeIngredient;

  ingredientMobMap: { [key: string]: string } = {
    'Sweet Hoof': 'pinedeer',
    'Greasy Peel': 'ewenana',
    'Fresh Mane': 'flyon',
    'Chewy Sole': 'unripe_wolfruit',
    'Savory Fin': 'green_catfish',
    'Crunchy Shell': 'rhyturtle',
    'Slimy Feather': 'crilia',
    'Unpleasant Talon': 'birdshark',
    'Spicy Hoof': 'bighorn_pinedeer',
    'Sour Peel': 'ramanana',
    'Zesty Mane': 'angry_flyon',
    'Soft Sole': 'ripe_wolfruit',
    'Tart Fins': 'blue_catfish',
    'Soft Shell': 'boss_rhyturtle',
    'Sticky Feather': 'patriarch_crilia',
    'Chewy Talon': 'patriarch_birdshark',
    'Slurpy Fruit': 'slurpy_tree',
  };

  constructor() {}

  ngOnInit(): void {}

  getMobImageSrc(ingredientName: string) {
    const mobName = this.ingredientMobMap[ingredientName] || 'mob_missing';

    return `assets/images/arcane_river/chu_chu_island/${mobName}.png`;
  }

  getMobDropImageSrc(ingredientName: string) {
    const mobDrop = ingredientName.replace(' ', '_').toLowerCase();

    return `assets/images/arcane_river/chu_chu_island/mob_drops/${mobDrop}.png`;
  }
}
