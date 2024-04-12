import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Posts } from '../../interfaces/user-post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../module/material/material.module';
import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../interfaces/comments';
import { User } from '../../interfaces/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, CommentsComponent, CommentsComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class PostsComponent implements AfterViewInit {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  @Input() user!: User;
  selectedPost: any;

  commentVisibility: { [postId: number]: boolean } = {};

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.getUserPosts();
    // this.getAllPosts
    console.log(this.getUserPosts())
     
  }

  getUserPosts(){
    const id = this.getUserId();
    // const id = this.route.snapshot.paramMap.get('id');
    if(id !== undefined){
      return this.userService.getUserPosts(id)
      .subscribe((_userPostSubscription)=> this.userPost = _userPostSubscription);
    }
     return;
  }

  getAllPosts(){
    return this.userService.getAllPosts();
  }

  
  selectPost(postId: number){
    this.commentVisibility[postId] = !this.commentVisibility[postId];
    this.userService.getPostComments(postId).subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }

  getUserId(){
    const cachedUser = this.authService.getCachedUser();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user.id;
  }

  ngOnDestroy(): void {
    // if(this.getUserPosts()){
    //   this.getUserPosts().unsubscribe();
    // }
  }

}
