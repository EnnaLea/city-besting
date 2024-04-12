import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.model';
import { UsersComponent } from '../users/users.component';
import { UsersDetailsComponent } from "../users-details/users-details.component";
import { UserService } from '../../services/user.service';
import { UserInfoComponent } from "../user-info/user-info.component";
import { PostsComponent } from "../user-posts/user-posts.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MaterialModule, CommonModule, UsersComponent, UsersDetailsComponent, UserInfoComponent, PostsComponent]
})
export class HomeComponent implements OnInit {

@Input() user!: User;
mail!: string;
name!: string;
staus!: string;
gender!: string;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
   this.getUser();
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

      console.log(changeUser);
      console.log(userId);
      if (userId !== undefined){
        return this.userService.updateUser(userId, changeUser).subscribe((_user) => {
          this.user = _user;
          this.authService.setCachedUser(this.user);
          alert('Changes saved');
          // window.location.reload();
        });
      } else {
        console.error('User ID is undefined');
      }
      return;
    }

  getUser(){
    const cachedUser = this.authService.getCachedUser();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user;
  }

  getUserId(){
    const cachedUser = this.authService.getCachedUser();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user.id;
  }


}
