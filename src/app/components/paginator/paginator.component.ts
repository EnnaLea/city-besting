import { Component } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  firstPage = 0;
  hasNextPage = true;
  currentPage = this.firstPage + 1;
  pageSizeOptions = ['5', '10', '20', '30', '50', '100'];
  selectedOption = '10';
  nextPage = this.currentPage + 1;
  previousPage = this.currentPage - 1;

  constructor() { }

  getNumberOfPages(){}

}
