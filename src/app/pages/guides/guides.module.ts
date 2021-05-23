import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidesRoutingModule } from './guides-routing.module';
import { GuidesComponent } from './guides.component';
import { ArcaneRiverDailiesListsComponent } from './components/arcane-river-dailies-lists/arcane-river-dailies-lists.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { HardMutoRecipesComponent } from './components/hard-muto-recipes/hard-muto-recipes.component';
import { ArcaneSymbolCostsComponent } from './components/arcane-symbol-costs/arcane-symbol-costs.component';
import { MutoRecipeComponent } from './components/hard-muto-recipes/components/muto-recipe/muto-recipe.component';
import { MutoRecipeIngredientInfoComponent } from './components/hard-muto-recipes/components/muto-recipe-ingredient-info/muto-recipe-ingredient-info.component';
import { FormModule } from 'src/app/framework/form/form.module';
import { TableModule } from 'src/app/framework/table/table.module';

@NgModule({
  declarations: [
    GuidesComponent,
    ArcaneRiverDailiesListsComponent,
    HardMutoRecipesComponent,
    ArcaneSymbolCostsComponent,
    MutoRecipeComponent,
    MutoRecipeIngredientInfoComponent,
  ],
  imports: [CommonModule, GuidesRoutingModule, LayoutModule, FrameworkModule, FormModule, TableModule],
})
export class GuidesModule {}
