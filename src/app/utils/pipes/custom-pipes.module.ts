import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesoDisplayPipe } from './meso-display.pipe';

@NgModule({
  declarations: [MesoDisplayPipe],
  imports: [CommonModule],
  exports: [MesoDisplayPipe],
})
export class CustomPipesModule {}
