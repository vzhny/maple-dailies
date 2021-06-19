import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, FontAwesomeModule, NgSelectModule, FormsModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
