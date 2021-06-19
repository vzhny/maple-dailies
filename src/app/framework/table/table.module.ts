import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FormModule } from '../form/form.module';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, FormModule, PaginationModule],
  exports: [TableComponent],
})
export class TableModule {}
