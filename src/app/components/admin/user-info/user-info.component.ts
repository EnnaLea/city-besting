import { AfterViewInit, Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.model';
import { UserService } from '../../../services/user.service';
import { MaterialModule } from '../../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserPostsComponent } from '../../user/user-posts/user-posts.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { AdminPostComponent } from '../admin-post/admin-post.component';
import { CacheService } from '../../../services/cache.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifiedComponent } from '../../../messages/modified/modified.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MaterialModule, CommonModule, NewPostComponent, AdminPostComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements AfterViewInit {

@Input() user!: User;
mail!: string;
name!: string;
status!: string;
gender!: string;

  constructor(private authService: AuthService, private userService: UserService, private cacheService: CacheService, private route: Router, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
   this.getUser();
  }

  ngAfterViewInit(){
    // this.getUser();
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
          this.cacheService.saveUser(this.user);
          this.openDialog();
        });
      } else {
        console.error('User ID is undefined');
      }
      return;
    }

    openDialog(): void {
      this.dialog.open(ModifiedComponent, {
        width: '250px',
      });
    }

    onClick(){
      this.route.navigateByUrl('/landing/');
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
