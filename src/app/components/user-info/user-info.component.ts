import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { AdminPostComponent } from '../admin-post/admin-post.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MaterialModule, CommonModule, NewPostComponent, AdminPostComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

@Input() user!: User;
mail!: string;
name!: string;
status!: string;
gender!: string;

  constructor(private authService: AuthService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
   this.getUser();
  }

  onSeePost(){
    this.route.navigateByUrl('/landing/admin-post');
  }

  onDetailsClick(id: number){
    this.route.navigateByUrl('/landing/new-post/' + id);
  }

  onCancel() {
    window.location.reload();
    }


    onSave() {
      const userId = this.getUserId();
      let changeUser : User = {
        name : this.name,
        email : this.mail,
        gender : this.gender,
        status : this.status
      }
      
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

    onClick(){
      this.route.navigateByUrl('/landing/');
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
