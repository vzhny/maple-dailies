import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidesRoutingModule } from './guides-routing.module';
import { GuidesComponent } from './guides.component';
import { ArcaneRiverDailiesInfoComponent } from './components/arcane-river-dailies-info/arcane-river-dailies-info.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { HardMutoRecipesComponent } from './components/hard-muto-recipes/hard-muto-recipes.component';
import { MutoRecipeComponent } from './components/hard-muto-recipes/components/muto-recipe/muto-recipe.component';
import { MutoRecipeIngredientInfoComponent } from './components/hard-muto-recipes/components/muto-recipe-ingredient-info/muto-recipe-ingredient-info.component';
import { FormModule } from 'src/app/framework/form/form.module';
import { TableModule } from 'src/app/framework/table/table.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrainingMapsComponent } from './components/training-maps/training-maps.component';
import { TrainingMapsFiltersComponent } from './components/training-maps/components/training-maps-filters/training-maps-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GuidesComponent,
    ArcaneRiverDailiesInfoComponent,
    HardMutoRecipesComponent,
    MutoRecipeComponent,
    MutoRecipeIngredientInfoComponent,
    TrainingMapsComponent,
    TrainingMapsFiltersComponent,
  ],
  imports: [
    CommonModule,
    GuidesRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LayoutModule,
    FrameworkModule,
    FormModule,
    TableModule,
  ],
  exports: [ArcaneRiverDailiesInfoComponent, HardMutoRecipesComponent],
})
export class GuidesModule {}
