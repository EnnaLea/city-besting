import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../module/material/material.module';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule, MaterialModule,],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{

  @Input() users!: Array<User>;
  @Input() fullWidthMode = false;
  userSubscription!: Subscription | undefined;
 

  constructor(private userService: UserService, private route: Router){}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe((_users)=> this.users = _users);

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
