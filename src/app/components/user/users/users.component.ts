import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user.model';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../../module/material/material.module';
import { Route, Router } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule, MaterialModule, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{

  @Input() users!: User[];
  @Input() fullWidthMode = false;
  userSubscription!: Subscription | undefined;
  search : String ="";
  filteredUserList: Array<User> = [];
  loading: boolean = false;
 

  constructor(private userService: UserService, private route: Router){
    this.filteredUserList = this.users;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe((_users)=> this.users = _users);
  }

  filterResults(filter: string){
    this.filteredUserList = []; // Clear the array before pushing new items
    if(filter === ''){
      this.filteredUserList = this.users;
      this.loading = true;
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
      this.loading = true;
    }
    this.filteredUserList.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredUserList.sort((a, b) => a.email.localeCompare(b.email));
    this.filteredUserList.sort((a, b) => a.gender.localeCompare(b.gender));
    this.filteredUserList.sort((a, b) => a.status.localeCompare(b.status));
    
  }

  onDeleteClick(id: number){
    this.userService.deleteUser(id).subscribe(()=> this.users = this.users.filter(user => user.id !== id));
    this.route.navigateByUrl('/landing/'); //TODO: Redirect to the page where the user was deleted
  
  }

  onDetailsClick(id: number){
    this.route.navigateByUrl('/landing/users-detail/' + id);
  }

  ngOnDestroy(): void {

    // if(this.userSubscription){
    //   this.userSubscription.unsubscribe();
    // }
  }


}
