import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/framework/table/table.types';
import { GuildPointCapInfo } from '../../guides.types';

@Component({
  selector: 'app-guild-point-cap',
  templateUrl: './guild-point-cap.component.html',
})
export class GuildPointCapComponent implements OnInit {
  dailyColumns: TableColumn[] = [
    {
      headerTitle: 'Daily Boss',
      textAlign: 'left',
      width: '120',
    },
    {
      headerTitle: 'Contribution Points (Solo)',
      textAlign: 'center',
      width: '80',
    },
  ];

  weeklyColumns: TableColumn[] = [
    {
      headerTitle: 'Weekly Boss',
      textAlign: 'left',
      width: '120',
    },
    {
      headerTitle: 'Contribution Points (Solo)',
      textAlign: 'center',
      width: '80',
    },
  ];

  dailyBosses: GuildPointCapInfo[] = [
    {
      bossName: 'Normal Zakum',
      contributionPoints: 100,
      iconFileName: 'zakum.png',
    },
    {
      bossName: 'Normal Magnus',
      contributionPoints: 500,
      iconFileName: 'magnus.png',
    },
    {
      bossName: 'Normal Hilla',
      contributionPoints: 100,
      iconFileName: 'hilla.png',
    },
    {
      bossName: 'OMNI-CLN',
      contributionPoints: 250,
      iconFileName: 'omni-cln.png',
    },
    {
      bossName: 'Normal Papulatus',
      contributionPoints: 500,
      iconFileName: 'papulatus.png',
    },
    {
      bossName: 'Normal Crimson Queen',
      contributionPoints: 150,
      iconFileName: 'crimson-queen.png',
    },
    {
      bossName: 'Normal Pierre',
      contributionPoints: 150,
      iconFileName: 'pierre.png',
    },
    {
      bossName: 'Normal Von Bon',
      contributionPoints: 150,
      iconFileName: 'von-bon.png',
    },
    {
      bossName: 'Normal Vellum',
      contributionPoints: 150,
      iconFileName: 'vellum.png',
    },
    {
      bossName: 'Hard Von Leon',
      contributionPoints: 500,
      iconFileName: 'von-leon.png',
    },
    {
      bossName: 'Chaos Horntail',
      contributionPoints: 250,
      iconFileName: 'horntail.png',
    },
    {
      bossName: 'Normal Arkarium',
      contributionPoints: 500,
      iconFileName: 'arkarium.png',
    },
    {
      bossName: 'Normal Pink Bean',
      contributionPoints: 250,
      iconFileName: 'pink-bean.png',
    },
    {
      bossName: 'Hard Mori Ranmaru',
      contributionPoints: 500,
      iconFileName: 'mori-ranmaru.png',
    },

    {
      bossName: 'Julieta (x4)',
      contributionPoints: 600,
      iconFileName: 'julieta.png',
    },
  ];

  weeklyBosses: GuildPointCapInfo[] = [
    {
      bossName: 'Chaos Zakum',
      contributionPoints: 1000,
      iconFileName: 'zakum.png',
    },
    {
      bossName: 'Hard Magnus',
      contributionPoints: 1250,
      iconFileName: 'magnus.png',
    },
    {
      bossName: 'Hard Hilla',
      contributionPoints: 1000,
      iconFileName: 'hilla.png',
    },
    {
      bossName: 'Chaos Crimson Queen',
      contributionPoints: 1000,
      iconFileName: 'crimson-queen.png',
    },
    {
      bossName: 'Chaos Pierre',
      contributionPoints: 1000,
      iconFileName: 'pierre.png',
    },
    {
      bossName: 'Chaos Von Bon',
      contributionPoints: 1000,
      iconFileName: 'von-bon.png',
    },
    {
      bossName: 'Chaos Vellum',
      contributionPoints: 1250,
      iconFileName: 'vellum.png',
    },
    {
      bossName: 'Chaos Pink Bean',
      contributionPoints: 1000,
      iconFileName: 'pink-bean.png',
    },
    {
      bossName: 'Easy/Normal Cygnus',
      contributionPoints: 1000,
      iconFileName: 'cygnus.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
