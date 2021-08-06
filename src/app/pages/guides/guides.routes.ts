import { Routes } from '@angular/router';
import { ArcaneRiverDailiesInfoComponent } from './components/arcane-river-dailies-info/arcane-river-dailies-info.component';
import { GuildPointCapComponent } from './components/guild-point-cap/guild-point-cap.component';
import { HardMutoRecipesComponent } from './components/hard-muto-recipes/hard-muto-recipes.component';
import { MapleInfoCornerComponent } from './components/maple-info-corner/maple-info-corner.component';
import { SuckHardCalculatorsComponent } from './components/suckhard-calculators/suckhard-calculators.component';
import { TrainingMapsComponent } from './components/training-maps/training-maps.component';
import { GuidesComponent } from './guides.component';

export const routes: Routes = [
  {
    path: '',
    component: GuidesComponent,
    children: [
      {
        path: '',
        redirectTo: 'training-maps',
        pathMatch: 'full',
      },
      {
        path: 'training-maps',
        component: TrainingMapsComponent,
      },
      {
        path: 'arcane-river-dailies-info',
        component: ArcaneRiverDailiesInfoComponent,
      },
      {
        path: 'hard-muto-recipes',
        component: HardMutoRecipesComponent,
      },
      {
        path: 'guild-point-cap',
        component: GuildPointCapComponent,
      },
      {
        path: 'suckhard-calculators',
        component: SuckHardCalculatorsComponent,
      },
      // Commented out due to maple info corner only being http and being unable to load when app is built
      // {
      //   path: 'maple-info-corner',
      //   component: MapleInfoCornerComponent,
      // },
    ],
  },
];
