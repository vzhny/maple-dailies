import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/utils/character.service';

interface Daily {
  name: string;
  exchangeFlag: boolean;
}

interface DailyList {
  townName: string;
  canExchangeDailiesFlg: boolean;
  dailies: Daily[];
}

@Component({
  selector: 'app-arcane-river-dailies-lists',
  templateUrl: './arcane-river-dailies-lists.component.html',
  styleUrls: ['./arcane-river-dailies-lists.component.scss'],
})
export class ArcaneRiverDailiesListsComponent implements OnInit {
  dailiesLists: DailyList[] = [
    {
      townName: 'Vanishing Journey',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Kill 200 Happy Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Happy Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Raging Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Raging Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Sad Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Sad Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Joyful Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Joyful Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Stone Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Stone Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Blazing Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Blazing Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Soulful Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Soulful Erda's Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Tranquil Erdas`,
          exchangeFlag: true,
        },
        {
          name: `Collect 50 Tranquil Erda's Samples`,
          exchangeFlag: true,
        },
        {
          name: `Kill 130 Lantern Erdas (anti-AFK monster excluded)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 33 Lantern Erda's Samples (anti-AFK monster excluded)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 30 Oblivion Inhibitors and deliver to Jenna (found in Lake of Oblivion: Weathered Land of Rage and Sorrow)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 30 Extinction Inhibitors and deliver to Jenna (found in Extinction Zone: Fire Zone)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 30 Repose Inhibitors and deliver to Jenna (found in Cave of Repose: Below the Cave)`,
          exchangeFlag: false,
        },
      ],
    },
    {
      townName: 'Chu Chu Island',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Collect 50 Master Lyck's Recipes from any monsters`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Pinedeers`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Bighorn Pinedeers`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Ewenanas`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Ramananas`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Unripe Wolfruits`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Ripe Wolfruits`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Flyons`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Angry Flyons`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Green Catfish`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Blue Catfish`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Rhyturtles`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Boss Rhyturtles`,
          exchangeFlag: true,
        },
        {
          name: `Kill 200 Crilias`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Patriarch Crilias`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Birdsharks (anti-AFK monster excluded)`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Patriarch Birdsharks`,
          exchangeFlag: false,
        },
      ],
    },
    {
      townName: 'Lachelein',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Collect 50 Sleeping Dusts from any monsters`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Paper Bag Back Street Residents`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Wooden Board Back Street Residents`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Galinas`, exchangeFlag: false },
        { name: `Kill 200 Galus`, exchangeFlag: false },
        { name: `Kill 200 Angry Champion's Plates`, exchangeFlag: false },
        { name: `Kill 200 Crooked Champion's Plates`, exchangeFlag: false },
        { name: `Kill 200 Angry Partygoers`, exchangeFlag: false },
        { name: `Kill 200 Insane Partygoers`, exchangeFlag: false },
        { name: `Kill 200 Softened Cleaners`, exchangeFlag: false },
        { name: `Kill 200 Dancing Red Heels`, exchangeFlag: false },
        { name: `Kill 200 Cleaners`, exchangeFlag: false },
        { name: `Kill 200 Blue Eyes Gargoyles`, exchangeFlag: false },
        {
          name: `Kill 200 Red Eyes Gargoyles (anti-AFK monster excluded)`,
          exchangeFlag: false,
        },
      ],
    },
    {
      townName: 'Arcana',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Collect 50 Spirits of Forest Spirit from any monsters`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Spirit of Water`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Sunshine`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Earth`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Frost Cloud`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Lightning Cloud`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Deadly Poison`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Explosion`, exchangeFlag: false },
        {
          name: `Collect 50 Spirit of Cave Spirit from monsters in the Arcana Cave`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Spirit of Chaos`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Anguish`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Despair`, exchangeFlag: false },
        { name: `Kill 200 Spirit of Disharmony`, exchangeFlag: false },
      ],
    },
    {
      townName: 'Morass',
      canExchangeDailiesFlg: true,
      dailies: [
        { name: `Kill 200 Xenoroid Echo Type B`, exchangeFlag: false },
        {
          name: `Collect 50 Tasty Seedfoods (from Xenoroid Echo Type A/B)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Nameless Cats`, exchangeFlag: false },
        {
          name: `Collect 50 Glittering Powders (from Nameless Cats)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Stolen Fruits (from Strong Gangsters)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Mighty Brothers`, exchangeFlag: false },
        {
          name: `Collect 30 Anti-magic Fragments (from Xenoroid Echo Type A/B, Nameless Cats, Strong/Powerful Gangsters)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Blue Shadows`, exchangeFlag: false },
        { name: `Kill 200 Red Shadows`, exchangeFlag: false },
        {
          name: `Collect 50 Shadow Cores (from Blue/Red Shadows)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Experimental Residues (from Experiments Gone Wrong)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Big Experiments Gone Wrong`, exchangeFlag: false },
        { name: `Kill 200 Thralled Guards`, exchangeFlag: true },
        {
          name: `Collect 50 Broken Hammers (from Thralled Warhammer Knights)`,
          exchangeFlag: true,
        },
        { name: `Kill 200 Thralled Wizard`, exchangeFlag: true },
        {
          name: `Collect 50 Broken Bows (from Thralled Archer)`,
          exchangeFlag: true,
        },
        {
          name: `Collect 50 Memory Glass (from Vanishing Erdas, accessed from one of the hidden portals in "That Day in Truffet 2/3/4". Transport to Truffet Square or Laboratory once done.)`,
          exchangeFlag: true,
        },
        {
          name: `Collect 100 Memory Fragments (from all Morass monsters except Evaporating Erdas)`,
          exchangeFlag: false,
        },
        {
          name: `To Save Truffet (Find a hidden portal in That Day in Truffet 2/3/4, then fight through 3 maps of Vanishing Erdas. Transport to Truffet Square once done.)`,
          exchangeFlag: false,
        },
        {
          name: `Stabilising the Closed Area (Find a hidden portal in Closed Area 1/2/3, then fight through 3 maps of monsters. Transport to Truffet Square once done.)`,
          exchangeFlag: false,
        },
        {
          name: `Research Lab Defense (report to Laboratory, speak to the Researcher and accept the quest to enter. Fight through 5 waves of monsters like Polo portal.)`,
          exchangeFlag: false,
        },
      ],
    },
    {
      townName: 'Esfera',
      canExchangeDailiesFlg: true,
      dailies: [
        { name: `Kill 200 Ahtuins`, exchangeFlag: false },
        { name: `Collect 50 Ahtuin's Shells`, exchangeFlag: false },
        { name: `Kill 200 Atuses`, exchangeFlag: false },
        { name: `Collect 50 Atus's Shells`, exchangeFlag: false },
        { name: `Kill 200 Bellalions`, exchangeFlag: false },
        { name: `Collect 50 Bellalion's Scales`, exchangeFlag: false },
        { name: `Kill 200 Bellalises`, exchangeFlag: false },
        { name: `Collect 50 Bellalis' Scales`, exchangeFlag: false },
        { name: `Kill 200 Aranyas`, exchangeFlag: false },
        { name: `Collect 50 Aranya's Claws`, exchangeFlag: false },
        { name: `Kill 200 Araneas`, exchangeFlag: false },
        { name: `Collect 50 Aranea's Claws`, exchangeFlag: false },
        { name: `Kill 200 Keepers of Light`, exchangeFlag: false },
        { name: `Collect 50 Keepers of Light's Rings`, exchangeFlag: false },
        { name: `Kill 200 Keepers of Dark`, exchangeFlag: false },
        { name: `Collect 50 Keepers of Dark's Rings`, exchangeFlag: false },
        { name: `Kill 200 Light Executors`, exchangeFlag: false },
        { name: `Collect 50 Light Executors' Rings`, exchangeFlag: false },
        { name: `Kill 200 Dark Executors`, exchangeFlag: false },
        { name: `Collect 50 Dark Executors' Rings `, exchangeFlag: false },
      ],
    },
    {
      townName: 'Tenebris - Moonbridge',
      canExchangeDailiesFlg: false,
      dailies: [
        { name: `Kill 200 Creatures of Chaos`, exchangeFlag: false },
        { name: `Kill 200 Creatures of Destruction`, exchangeFlag: false },
        { name: `Kill 200 Assaulting Fear`, exchangeFlag: false },
        { name: `Kill 200 Staring Fear`, exchangeFlag: false },
        { name: `Kill 200 Henchman of the Void`, exchangeFlag: false },
        { name: `Kill 200 Henchman of Twilight`, exchangeFlag: false },
      ],
    },
    {
      townName: 'Tenebris - Labyrinth of Suffering',
      canExchangeDailiesFlg: false,
      dailies: [
        { name: `Kill 200 Obeying Pieces`, exchangeFlag: false },
        { name: `Kill 200 Scrambled Pieces`, exchangeFlag: false },
        { name: `Kill 200 Failure of Darkness`, exchangeFlag: false },
        { name: `Kill 200 Creature of Darkness`, exchangeFlag: false },
        { name: `Kill 200 Wings of Despair`, exchangeFlag: false },
        { name: `Kill 200 Blade of Despair`, exchangeFlag: false },
        { name: `Kill 200 Knight of Silence`, exchangeFlag: false },
        { name: `Kill 200 Observer of Silence`, exchangeFlag: false },
        { name: `Kill 200 Wanderer of Silence`, exchangeFlag: false },
        { name: `Kill 200 Watcher of Silence`, exchangeFlag: false },
        { name: `Kill 200 Assassin of Silence`, exchangeFlag: false },
        { name: `Kill 200 The One Who Fell into Despair`, exchangeFlag: false },
        { name: `Kill 200 The One Who Bound to Despair`, exchangeFlag: false },
        { name: `Clear Maze Dungeon`, exchangeFlag: true },
      ],
    },
    {
      townName: 'Liminia',
      canExchangeDailiesFlg: false,
      dailies: [
        { name: `Kill 200 Ansestion`, exchangeFlag: false },
        { name: `Kill 200 Transcendion`, exchangeFlag: false },
        { name: `Kill 200 Ascencion`, exchangeFlag: false },
        { name: `Kill 200 Foreberion`, exchangeFlag: false },
        { name: `Kill 200 Embrion`, exchangeFlag: false },
      ],
    },
  ];

  availableDailiesLists: DailyList[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.watchSelectedCharacter().subscribe(character => {
      if (character !== null) {
        const availableArcaneRiverAreas = this.characterService.getAvailableArcaneRiverAreas(character.level);

        this.availableDailiesLists = availableArcaneRiverAreas.length !== 0
          ? this.dailiesLists.filter(list => availableArcaneRiverAreas.includes(list.townName))
          : this.dailiesLists;
      } else {
        this.availableDailiesLists = this.dailiesLists;
      }
    });
  }
}
