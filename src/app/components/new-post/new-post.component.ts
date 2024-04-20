import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CacheService } from '../../services/cache.service';
import { Posts } from '../../interfaces/user-post';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MaterialModule, UserInfoComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit,  AfterViewInit {
  @Input() id!: number;
   post!: Posts;
   title!: string;
   body!: string;

   
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private cacheService: CacheService){
  }

  ngOnInit(): void {
    console.log(this.getUserId());
  }

  ngAfterViewInit(): void {
  }

  goBack(){
    this.router.navigate(['/landing/user-info']);
  }

  newPost(){
    const userId = Number(this.getUserId());
    let postBody: Posts ={
      user_id : userId,
      title: this.title,
      body: this.body
    }

    this.userService.createUserPost(userId, postBody).subscribe((_post) => this.post = _post);
    // console.log(this.userService.createUserPost(userId, postBody).subscribe((_post) => this.post = _post));
    // window.location.reload();
    
  }

  getUserId(){
    const id = this.cacheService.getUserSaved()?.id;
    return id;
  }


}
