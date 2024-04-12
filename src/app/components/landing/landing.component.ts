import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../module/material/material.module';
import { UsersComponent } from '../users/users.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Comments } from '../../interfaces/comments';
import { Posts } from '../../interfaces/user-post';
import { User } from '../../interfaces/user.model';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ HeaderComponent, RouterOutlet, MaterialModule, UsersComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent{
  user!: User;
  post!: Posts;
  comment!: Comments;

  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder, private route: Router, private userService: UserService) {}

  onClick() {
    this.route.navigateByUrl('/landing/home');
    }

  onCreateUserClick(){}

  onCreatePostClick(post: Posts) {
    this.route.navigateByUrl('/landing/posts')

  }

}
