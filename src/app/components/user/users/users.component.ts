import { Component, Input, OnDestroy, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user.model';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject, Observable, Subscription, combineLatest, tap } from 'rxjs';
import { MaterialModule } from '../../../module/material/material.module';
import { Route, Router } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';
import { filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../../messages/delete/delete.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule, MaterialModule, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{

  @Input() users!: Array<User>;
  @Input() fullWidthMode = false;
  userSubscription!: Subscription | undefined;
  search!: String;
  filteredUserList!: Array<User>;
  loading: boolean = true;

    // pagination
    @Input({ transform: numberAttribute }) length!: number 
    totalArray!: number;
    pageSizeOptions: number[] = [10, 30, 50];
    pageSize: number = 10;
    currentPage: number = 1;
    showFirstLastButtons = true;
    pageIndex = 0;
    pageEvent!: PageEvent;
    dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(this.users);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  constructor(private userService: UserService, private route: Router, public dialog: MatDialog){
    
      this.filteredUserList = this.users;
  
    
    // this.filteredUserList = this.allUsers();
    // this.filterResults('');
    
  }


  ngOnInit(): void {
      // this.userSubscription = this.userService.getUsers()
      // .pipe(tap(() => this.loading = false))
      // .subscribe((_users)=> this.users = _users);

      this.getUsers();

  } 


  getUsers(): void{
    this.userService.getUsers(this.pageIndex + 1, this.pageSize)
    .subscribe((users: User[]) => {
      this.users = users;
      setTimeout(()=>{
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.totalArray = users.length + 300;
      }, 0)
      this.loading = false;
    }); 
  }


  filterResults(filter: string){
    this.filteredUserList = []; // Clear the array before pushing new items
    if(filter === ''){
      this.filteredUserList = this.users;
      this.loading = false;
    } else {
      for(let user of this.users){
        if(user.name.toLowerCase().includes(filter.toLowerCase()) ||
           user.email.toLowerCase().includes(filter.toLowerCase()) ||
           user.gender.toLowerCase().match(filter.toLowerCase()) ||
           user.status.toLowerCase().match(filter.toLowerCase())
          )
           {
          this.filteredUserList.push(user);
        }
      }
      this.loading = false;
    }
    this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredUserList.sort((a, b) => a.email.localeCompare(b.email));
    this.filteredUserList.sort((a, b) => a.gender.localeCompare(b.gender));
    this.filteredUserList.sort((a, b) => a.status.localeCompare(b.status));
    
  }

// filterResults(filter: string){
//   this.filteredUserList = new Observable<User[]>(); // Clear the array before pushing new items
//   if(filter === ''){
//     this.filteredUserList = this.allUsers();
//   } else {
//     this.users.subscribe((users: User[]) => {
//       for(let user of users){
//         if(user.name.toLowerCase().includes(filter.toLowerCase()) ||
//            user.email.toLowerCase().includes(filter.toLowerCase()) ||
//            user.status.toLowerCase().match(filter.toLowerCase())
//           )
//            {
//           this.filteredUserList = this.filteredUserList.pipe(map(filteredUserList => [...filteredUserList, user]));
//         }
//       }
//     });

//   this.filteredUserList.subscribe((filteredUserList) => filteredUserList.sort((a, b) => a.name.localeCompare(b.name)));
//   this.filteredUserList.subscribe((filteredUserList) => filteredUserList.sort((a, b) => a.email.localeCompare(b.email)));
//   this.filteredUserList.subscribe((filteredUserList) => filteredUserList.sort((a, b) => a.status.localeCompare(b.status)));
  
// }
// }

onPageChange(event: PageEvent): void {
  this.pageEvent = event;
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getUsers();
}

  onDeleteClick(id: number){
    this.userService.deleteUser(id).subscribe(()=> this.users = this.users.filter(user => user.id !== id));
    this.openDialog();
    // this.userService.deleteUser(id).subscribe(() => {
    //   this.users = this.users.pipe(
    //     map(users => users.filter(user => user.id !== id))
    //   );
    // });
    // window.location.reload();
     //TODO: Redirect to the page where the user was deleted
  
  }

  openDialog(): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
    });
  }


  // import { filter } from 'rxjs/operators';

// Inside your onDeleteClick function
// this.userService.deleteUser(id).subscribe(() => {
//   this.users = this.users.pipe(
//     map(users => users.filter(user => user.id !== id))
//   );
// });

  onDetailsClick(id: number){
    this.route.navigateByUrl('/landing/users-detail/' + id);
  }

  ngOnDestroy(): void {

    // if(this.userSubscription){
    //   this.userSubscription.unsubscribe();
    // }
  }


}
