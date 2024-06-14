import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent {
  @Input() resultCount: number = 0
  @Input() currentResultCount: number = 0
  @Input() currentPage: number = 0
  @Output() nextPage = new EventEmitter<void>()
  @Output() previousPage = new EventEmitter<void>()

  nextPageEmit(){
    console.log(1)
    this.nextPage.emit()
  }
  previousPageEmit(){
    this.previousPage.emit()
  }
}
