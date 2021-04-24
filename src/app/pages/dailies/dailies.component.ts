import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { ModalService } from 'src/app/framework/modal/modal.service';
import { ResetTimerService } from 'src/app/utils/reset-timer.service';

export interface Daily {
  text: string;
  completed: boolean;
  hidden: boolean;
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
      hidden: false,
    },
    {
      text: 'Morass - Kill/Fetch Quests',
      completed: false,
      hidden: false,
    },
    {
      text: 'Arcana - Kill/Fetch Quest',
      completed: false,
      hidden: false,
    },
    {
      text: 'Arcana - Spirit Savior',
      completed: false,
      hidden: true,
    },
    {
      text: 'Lachelein - Kill/Fetch Quest',
      completed: false,
      hidden: false,
    },
    {
      text: 'Lachelein - Dream Defender',
      completed: false,
      hidden: false,
    },
    {
      text: 'Chu Chu Island - Kill/Fetch Quest',
      completed: false,
      hidden: false,
    },
    {
      text: 'Chu Chu Island - Hard Muto',
      completed: false,
      hidden: false,
    },
    {
      text: 'Vanishing Journey - Kill/Fetch Quest',
      completed: false,
      hidden: false,
    },
    {
      text: 'Vanishing Journey - Edra Spectrum',
      completed: false,
      hidden: true,
    },
  ];

  hotelMapleDailies: Daily[] = [
    {
      text: 'Coin Cap (300 coins)',
      completed: false,
      hidden: false,
    },
    {
      text: 'Pay for VIP Pass (200 coins)',
      completed: false,
      hidden: false,
    },
  ];

  otherDailies: Daily[] = [
    {
      text: 'Legion - Kill 100 Wyverns & Kill 20 Golden Wyverns',
      completed: false,
      hidden: false,
    },
  ];

  addIcon = faPlus;
  remainingTime: string | null = null;
  addNewDailyListModalId = 'addNewDailyListModal';

  constructor(
    private resetTimerService: ResetTimerService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.resetTimerService.remainingTime.subscribe(
      (remainingTime) => (this.remainingTime = remainingTime)
    );

    this.resetTimerService.onReset.subscribe(() => {
      this.arcaneRiverDailies.forEach(this.resetDaily);
      this.otherDailies.forEach(this.resetDaily);
    });
  }

  resetDaily(daily: Daily) {
    daily.completed = false;
  }

  openSettingsModal() {
    this.modalService.open(this.addNewDailyListModalId);
  }
}
