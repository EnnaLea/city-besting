import { Component } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MaterialModule, UserInfoComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  
  constructor(private route: Router, private userService: UserService){
  }

  


}
