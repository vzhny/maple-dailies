import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

interface HomeDetailsHeroSection {
  headerTitle: string;
  bodyText: string;
  additionalBodyText: string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  placeholderImageSrc = 'https://via.placeholder.com/1280x720';
  moreInformationBelowIcon = faArrowAltCircleDown;

  sections: HomeDetailsHeroSection[] = [
    {
      headerTitle: `No more spreadsheets!`,
      bodyText: `Tracking all your dailies, bosses, and character progression all in one convenient place — either on your dashboard or go in-depth.`,
      additionalBodyText: `Scroll down for more information about the app!`,
    },
    {
      headerTitle: `Streamline the grind`,
      bodyText: `Easy-to-make and use lists for any and everything to do in MapleStory! All lists automatically reset each day and with character-wide lists, never forget anything before you log out of the mushroom game.`,
      additionalBodyText: null,
    },
    {
      headerTitle: `Stay on top of bossing!`,
      bodyText: `At a quick glance, see how many daily and weekly bosses you need to take down and how much mesos you'll earn each week.`,
      additionalBodyText: null,
    },
    {
      headerTitle: `Information all in one place`,
      bodyText: `Easily find training maps for any level range, never forgot Muto recipes, and get full lists of which Arcane River dailies to skip!`,
      additionalBodyText: null,
    },
    {
      headerTitle: `Mains and mules all welcome!`,
      bodyText: `With multiple character support, never lose track of event coin capping, individual leveling goals, and everything in between.`,
      additionalBodyText: null,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
