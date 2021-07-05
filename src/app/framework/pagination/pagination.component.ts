import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { NumberService } from 'src/app/utils/services/number.service';
import { TableData } from '../table/table.types';
import { PageSize } from './pagination.types';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data: TableData[] = [];
  @Input() pageSize: PageSize = 10;

  @Output() paginate = new EventEmitter<TableData[]>();

  pageSizeOptions: PageSize[] = [5, 10, 20, 50, 100, 'All'];
  selectedPage = 1;
  pages: number[] = [];

  previousIcon = faChevronLeft;
  nextIcon = faChevronRight;

  constructor(private numberService: NumberService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length > 0) {
      this.pages = this.generatePages();
      this.getPaginatedData();
    }
  }

  generatePages() {
    if (this.pageSize !== 'All') {
      return this.numberService.generateNumberRange(1, Math.ceil(this.data.length / this.pageSize));
    } else {
      return [1];
    }
  }

  selectPage(pageNumber: number) {
    this.selectedPage = pageNumber;

    this.getPaginatedData();
  }

  onPageSizeChange(selectedPageSize: PageSize) {
    this.pageSize = selectedPageSize;
    this.pages = this.generatePages();

    if (this.selectedPage !== 1 && !this.pages.includes(this.selectedPage)) {
      this.selectedPage = this.pages.length;
    }

    this.getPaginatedData();
  }

  movePage(newPageNumber: number) {
    if (newPageNumber !== 0 && newPageNumber <= this.pages.length) {
      this.selectPage(newPageNumber);
    }
  }

  private getPaginatedData() {
    const startingIndex = this.getStartingIndex(this.selectedPage);
    const endingIndex = this.pageSize !== 'All' ? startingIndex + this.pageSize : this.data.length;

    this.paginate.emit(this.data.slice(startingIndex, endingIndex));
  }

  private getStartingIndex(pageNumber: number) {
    if (pageNumber === 1) {
      return 0;
    } else {
      if (this.pageSize !== 'All') {
        return this.pageSize * (pageNumber - 1);
      } else {
        return 0;
      }
    }
  }
}
