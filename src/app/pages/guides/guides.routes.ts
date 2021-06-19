import { Routes } from '@angular/router';
import { ArcaneRiverDailiesInfoComponent } from './components/arcane-river-dailies-info/arcane-river-dailies-info.component';
import { HardMutoRecipesComponent } from './components/hard-muto-recipes/hard-muto-recipes.component';
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
    ],
  },
];
