import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, LoaderModule],
  exports: [ImageComponent],
})
export class ImageModule {}
