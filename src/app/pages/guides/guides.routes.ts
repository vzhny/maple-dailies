import { Routes } from '@angular/router';
import { ArcaneRiverDailiesListsComponent } from './components/arcane-river-dailies-lists/arcane-river-dailies-lists.component';
import { ArcaneSymbolCostsComponent } from './components/arcane-symbol-costs/arcane-symbol-costs.component';
import { HardMutoRecipesComponent } from './components/hard-muto-recipes/hard-muto-recipes.component';
import { GuidesComponent } from './guides.component';

export const routes: Routes = [
  {
    path: '',
    component: GuidesComponent,
    children: [
      {
        path: '',
        redirectTo: 'arcane-river-dailies',
        pathMatch: 'full',
      },
      {
        path: 'arcane-river-dailies',
        component: ArcaneRiverDailiesListsComponent,
      },
      {
        path: 'hard-muto-recipes',
        component: HardMutoRecipesComponent,
      },
      {
        path: 'arcane-symbol-costs',
        component: ArcaneSymbolCostsComponent,
      },
    ],
  },
];
