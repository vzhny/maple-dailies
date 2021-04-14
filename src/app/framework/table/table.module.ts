import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, FormModule],
  exports: [TableComponent],
})
export class TableModule {}
