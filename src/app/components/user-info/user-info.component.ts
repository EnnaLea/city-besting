import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MaterialModule, CommonModule,],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

@Input() user!: User;
mail!: string;
name!: string;
status!: string;
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
