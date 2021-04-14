import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

export interface Daily {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
  styleUrls: ['./dailies.component.scss'],
})
export class DailiesComponent implements OnInit {
  arcaneRiverDailies: Daily[] = [
    {
      text: 'Esfera - Kill/Fetch Quests',
      completed: false,
    },
    {
      text: 'Morass - Kill/Fetch Quests',
      completed: false,
    },
    {
      text: 'Arcana - Kill/Fetch Quest',
      completed: false,
    },
    {
      text: 'Arcana - Spirit Savior',
      completed: false,
    },
    {
      text: 'Lachelein - Kill/Fetch Quest',
      completed: false,
    },
    {
      text: 'Lachelein - Dream Defender',
      completed: false,
    },
    {
      text: 'Chu Chu Island - Kill/Fetch Quest',
      completed: false,
    },
    {
      text: 'Chu Chu Island - Hard Muto',
      completed: false,
    },
    {
      text: 'Vanishing Journey - Kill/Fetch Quest',
      completed: false,
    },
    {
      text: 'Vanishing Journey - Edra Spectrum',
      completed: false,
    },
  ];

  otherDailies: Daily[] = [
    {
      text: 'Legion - Kill 100 Wyverns & Kill 20 Golden Wyverns',
      completed: false,
    },
  ];

  addIcon = faPlus;

  constructor() {}

  ngOnInit(): void {
    of(this.arcaneRiverDailies).subscribe((data) => {
      console.log('data was updated', data);
    });
  }

  addDaily() {
    this.arcaneRiverDailies.push({
      text: 'Added Daily Example',
      completed: false,
    });
  }
}
