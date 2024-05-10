import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() page!:number;
  @Input() isForwardAvailable!:boolean;
  @Input() isForwardMoreAvailable!:boolean;
  @Output() pageEmitter:EventEmitter<number>= new EventEmitter<number>();

  // @Output() pageChange: EventEmitter<{ pageIndex: number, pageSize: number }> = new EventEmitter();

  pageSizeOptions = [5, 10, 20, 30, 50, 100];
  selectedPageSize = 20;
  pageIndex = 0;



  constructor() { }

  // onPageChange(event: any) {
  //   this.pageIndex = event.pageIndex;
  //   this.selectedPageSize = event.pageSize;
  //   this.pageChange.emit({ pageIndex: this.pageIndex, pageSize: this.selectedPageSize });
  // }


  public nextPage(action:string) {
    switch(action) {
      case "next": this.page +=1;
      break;
      case "nextMore": this.page += 10;
      break;
      case "prev": this.page -=1;
      break;
      case "prevMore": this.page -= 10;
      break;
    }
    this.pageEmitter.emit(this.page);
  }

}
