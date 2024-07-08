import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../module/material/material.module';
import { UsersComponent } from '../../user/users/users.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Comments } from '../../../interfaces/comments';
import { Posts } from '../../../interfaces/user-post';
import { User } from '../../../interfaces/user.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ HeaderComponent, RouterOutlet, MaterialModule, UsersComponent,HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
  
  user!: User;
  post!: Posts;
  comment!: Comments;

  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder, private route: Router, private authService: AuthService) {
    //authService.expiredTime();
  }
  ngAfterViewInit(): void {
    this.authService.expiredTime();
  }


  onClick() {
    this.route.navigateByUrl('/landing/home');
    }

  onAdminClick(){
    this.route.navigate(['/landing/user-info']);
  }

  onViewPostsClick() {
    this.route.navigateByUrl('/landing/posts');

  }

  onCreatePostClick(){
    this.route.navigateByUrl('/landing/new-post');
  }

  onLogoutClick() {
    this.authService.logout();
    }

}
