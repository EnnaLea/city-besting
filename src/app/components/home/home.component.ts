import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.model';
import { UsersComponent } from '../user/users/users.component';
import { UsersDetailsComponent } from "../user/users-details/users-details.component";
import { UserService } from '../../services/user.service';
import { UserInfoComponent } from "../admin/user-info/user-info.component";
import { UserPostsComponent } from "../user/user-posts/user-posts.component";
import { Router } from '@angular/router';
import { NewPostComponent } from '../admin/new-post/new-post.component';
import { CreateUserComponent } from '../admin/create-user/create-user.component';
import { CacheService } from '../../services/cache.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MaterialModule, CommonModule, UsersComponent, UsersDetailsComponent, UserInfoComponent, UserPostsComponent, NewPostComponent, UsersDetailsComponent, CreateUserComponent]
})
export class HomeComponent implements OnInit {

@Input() user!: User;
mail!: string;
name!: string;
staus!: string;
gender!: string;

  constructor(private cacheService: CacheService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
   this.getUser();
  }

  onDetailsClick(id: number) {
    this.route.navigateByUrl('/landing/users-detail/' + id);
  }

  onCancel() {
    
    }


    onSave() {
      const userId = this.getUserId();
      let changeUser : User = {
        name : this.name,
        email : this.mail,
        gender : this.gender,
        status : this.staus
      }

      // console.log(changeUser);
      // console.log(userId);
      if (userId !== undefined){
        return this.userService.updateUser(userId, changeUser).subscribe((_user) => {
          this.user = _user;
          this.cacheService.saveUser(this.user);
          alert('Changes saved');
          // window.location.reload();
        });
      } else {
        console.error('User ID is undefined');
      }
      return;
    }

  getUser(){
    const cachedUser = this.cacheService.getUserSaved();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user;
  }

  getUserId(){
    const cachedUser = this.cacheService.getUserSaved();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user.id;
  }


}
