import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material/material.module';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CacheService } from '../../../services/cache.service';
import { Posts } from '../../../interfaces/user-post';
import { MatDialog } from '@angular/material/dialog';
import { CreatedPostComponent } from '../../../messages/created-post/created-post.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit,  AfterViewInit {
  @Input() id!: number;
   post!: Posts;
   title!: string;
   body!: string;

   
  
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private authService: AuthService, public dialog: MatDialog){
  }

  ngOnInit(): void {
    console.log(this.getAdminId());
    // console.log(this.newPost());
  }

  ngAfterViewInit(): void {
  }

  goBack(){
    this.router.navigate(['/landing/user-info']);
  }

  openDialog(): void {
    this.dialog.open(CreatedPostComponent, {
      width: '250px',
    });
  }

  newPost(){
    const userId = Number(this.getAdminId());
    let postBody: Posts ={
      user_id : userId,
      title: this.title,
      body: this.body,
    };
  
    this.userService.createUserPost(userId, postBody).subscribe((_post) => this.post = _post);
    // this.openDialog();

    // console.log(userId);
    // console.log(postBody);
    console.log(this.userService.createUserPost(userId, postBody).subscribe((_userPostSubscription) => this.post = _userPostSubscription));
    // window.location.reload();
    
  }

  getAdminId(){
    const id = this.authService.getCachedUser()?.id;
    return id;
  }


}
