import { Component, Input, OnInit } from '@angular/core';
import { faCircle, faCubes, faSkull } from '@fortawesome/free-solid-svg-icons';
import { CharacterService } from 'src/app/utils/services/character.service';
import { DailyInfoList } from '../../guides.types';

@Component({
  selector: 'app-arcane-river-dailies-info',
  templateUrl: './arcane-river-dailies-info.component.html',
})
export class ArcaneRiverDailiesInfoComponent implements OnInit {
  @Input() onDashboard = false;

  dailiesLists: DailyInfoList[] = [
    {
      townName: 'Vanishing Journey & Reverse City',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Kill 200 Happy Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Happy Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Raging Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Raging Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Sad Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Sad Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Joyful Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Joyful Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Stone Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Stone Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Blazing Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Blazing Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Soulful Erdas`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Soulful Erda Samples`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Tranquil Erdas`,
          exchangeFlag: true,
        },
        {
          name: `Collect 50 Tranquil Erda Samples`,
          exchangeFlag: true,
        },
        {
          name: `Kill 130 Lantern Erdas (anti-AFK monster excluded)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 33 Lantern Erda Samples (anti-AFK monster excluded)`,
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
        { name: `Kill 200 Edra Rats`, exchangeFlag: false },
        { name: `kill 200 Montos`, exchangeFlag: false },
        { name: `Kill 200 Seeker T-Drone Type As`, exchangeFlag: false },
        { name: `Kill 200 Seeker T-Drone Type Bs`, exchangeFlag: false },
        { name: `Collect 50 T-Boy's Drone Parts from momsters in Reverse City`, exchangeFlag: false },
        { name: `Kill 200 Combat T-Drone Type As`, exchangeFlag: false },
        { name: `Kill 200 Combat T-Drone Type Bs`, exchangeFlag: false },
        { name: `Kill 200 Exterminator T-Drone Type As`, exchangeFlag: true },
        { name: `Kill 200 Exterminator T-Drone Type Bs`, exchangeFlag: true },
      ],
    },
    {
      townName: 'Chu Chu Island & Yum Yum Island',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Collect 50 Master Lyck's Recipes from any monsters in Chu Chu Island`,
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
        { name: `Kill 200 Monkeylogs`, exchangeFlag: false },
        { name: `Kill 200 Bushrooms`, exchangeFlag: false },
        { name: `Kill 200 Lytones`, exchangeFlag: false },
        { name: `Kill 200 Stonpys`, exchangeFlag: false },
        { name: `Kill 200 Kumpiders`, exchangeFlag: false },
        { name: `Kill 200 Squirrenons`, exchangeFlag: false },
      ],
    },
    {
      townName: 'Lachelein',
      canExchangeDailiesFlg: true,
      dailies: [
        {
          name: `Collect 50 Sleeping Powder from any monsters`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Paper Bag Alley Citizens`,
          exchangeFlag: false,
        },
        {
          name: `Kill 200 Wood Board Alley Citizens`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Gallinas`, exchangeFlag: false },
        { name: `Kill 200 Gallus`, exchangeFlag: false },
        { name: `Kill 200 Angry Victory Plates`, exchangeFlag: false },
        { name: `Kill 200 Crooked Victory Plates`, exchangeFlag: false },
        { name: `Kill 200 Angry Masquerade Citizens`, exchangeFlag: false },
        { name: `Kill 200 Insane Masquerade Citizens`, exchangeFlag: false },
        { name: `Kill 200 Weakened Dreamkeepers`, exchangeFlag: false },
        { name: `Kill 200 Red Dancing Shoes`, exchangeFlag: false },
        { name: `Kill 200 Dreamkeepers`, exchangeFlag: false },
        { name: `Kill 200 Blue-Eyed Gargoyles`, exchangeFlag: false },
        {
          name: `Kill 200 Red-Eyed Gargoyles (anti-AFK monster excluded)`,
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
        { name: `Kill 200 Water Spirits`, exchangeFlag: false },
        { name: `Kill 200 Sun Spirits`, exchangeFlag: false },
        { name: `Kill 200 Earth Spirits`, exchangeFlag: false },
        { name: `Kill 200 Snow Cloud Spirits`, exchangeFlag: false },
        { name: `Kill 200 Thunder Cloud Spirits`, exchangeFlag: false },
        { name: `Kill 200 Toxic Spirits`, exchangeFlag: false },
        { name: `Kill 200 Volatile Spirits`, exchangeFlag: false },
        {
          name: `Collect 50 Cave Spirits from monsters in the Arcana Cave`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Befuddled Spirits`, exchangeFlag: false },
        { name: `Kill 200 Anguished Spirits`, exchangeFlag: false },
        { name: `Kill 200 Mournful Spirits`, exchangeFlag: false },
        { name: `Kill 200 Discordant Spirits`, exchangeFlag: false },
      ],
    },
    {
      townName: 'Morass',
      canExchangeDailiesFlg: true,
      dailies: [
        { name: `Kill 200 Xenoroid Echo Type Bs`, exchangeFlag: false },
        {
          name: `Collect 50 Tasty Seafood (from Xenoroid Echo Type As/Bs)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Nameless Cats`, exchangeFlag: false },
        {
          name: `Collect 50 Glittering Powder (from Nameless Cats)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Stolen Fruit (from Strong Gangsters)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Powerful Gangsters`, exchangeFlag: false },
        {
          name: `Collect 30 Anti-magic Fragments (from Xenoroid Echo Type As/Bs, Nameless Cats, Strong/Powerful Gangsters)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Blue Shadows`, exchangeFlag: false },
        { name: `Kill 200 Red Shadows`, exchangeFlag: false },
        {
          name: `Collect 50 Shadow Cores (from Blue/Red Shadows)`,
          exchangeFlag: false,
        },
        {
          name: `Collect 50 Experimental Fragments (from Experiments Gone Wrong)`,
          exchangeFlag: false,
        },
        { name: `Kill 200 Big Experiments Gone Wrong`, exchangeFlag: false },
        { name: `Kill 200 Thralled Guards`, exchangeFlag: true },
        {
          name: `Collect 50 Broken Hammers (from Thralled Warhammer Knights)`,
          exchangeFlag: true,
        },
        { name: `Kill 200 Thralled Wizards`, exchangeFlag: true },
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
          name: `Abandoned Area Sweep (Find a hidden portal in Closed Area 1/2/3, then fight through 3 maps of monsters. Transport to Truffet Square once done.)`,
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
        { name: `Collect 50 Ahtuin Shells`, exchangeFlag: false },
        { name: `Kill 200 Atus`, exchangeFlag: false },
        { name: `Collect 50 Atus Shells`, exchangeFlag: false },
        { name: `Kill 200 Bellalions`, exchangeFlag: false },
        { name: `Collect 50 Bellalion Scales`, exchangeFlag: false },
        { name: `Kill 200 Bellalises`, exchangeFlag: false },
        { name: `Collect 50 Bellalis Scales`, exchangeFlag: false },
        { name: `Kill 200 Aranyas`, exchangeFlag: false },
        { name: `Collect 50 Aranya Claws`, exchangeFlag: false },
        { name: `Kill 200 Araneas`, exchangeFlag: false },
        { name: `Collect 50 Aranea Claws`, exchangeFlag: false },
        { name: `Kill 200 Keepers of Light`, exchangeFlag: false },
        { name: `Collect 50 Keepers of Light Rings`, exchangeFlag: false },
        { name: `Kill 200 Keepers of Dark`, exchangeFlag: false },
        { name: `Collect 50 Keepers of Dark Rings`, exchangeFlag: false },
        { name: `Kill 200 Light Executors`, exchangeFlag: false },
        { name: `Collect 50 Light Executor Rings`, exchangeFlag: false },
        { name: `Kill 200 Dark Executors`, exchangeFlag: false },
        { name: `Collect 50 Dark Executor Rings `, exchangeFlag: false },
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

  killIcon = faSkull;
  collectIcon = faCubes;
  otherIcon = faCircle;

  availableDailiesLists: DailyInfoList[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.watchSelectedCharacter().subscribe((character) => {
      if (character !== null && !this.onDashboard) {
        const availableArcaneRiverAreas = this.characterService.getAvailableArcaneRiverAreas(character.level);

        this.availableDailiesLists =
          availableArcaneRiverAreas.length !== 0
            ? this.dailiesLists.filter((list) => availableArcaneRiverAreas.includes(list.townName))
            : this.dailiesLists;
      } else {
        const onlyShouldExchangeDailiesList = [...this.dailiesLists];

        onlyShouldExchangeDailiesList.forEach((list) => {
          list.dailies = list.dailies.filter((daily) => daily.exchangeFlag);
        });

        this.availableDailiesLists = onlyShouldExchangeDailiesList.filter((list) => list.dailies.length > 0);
      }
    });
  }

  getDailyIcon(name: string) {
    const isKillQuest = name.toLowerCase().includes('kill');
    const isCollectQuest = name.toLowerCase().includes('collect');

    if (isKillQuest) {
      return this.killIcon;
    } else if (isCollectQuest) {
      return this.collectIcon;
    } else {
      return this.otherIcon;
    }
  }
}
