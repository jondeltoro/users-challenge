import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users-list-pagination',
  templateUrl: './users-list-pagination.component.html',
  styleUrls: ['./users-list-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListPaginationComponent implements OnInit {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Output() changePage = new EventEmitter<number>();

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  generateArray(n: number) {
    return Array(n).fill(0).map((e, i) => i + 1);
  }

  selectPage(n: number) {
    if (n !== this.currentPage) {
      this.changePage.emit(n);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.changePage.emit(this.currentPage - 1);
    }
  }
}
