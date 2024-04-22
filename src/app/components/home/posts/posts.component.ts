import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Posts } from '../../../interfaces/user-post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../module/material/material.module';
// import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../../interfaces/comments';
import { LoaderComponent } from '../../loader/loader.component';
import { finalize } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements AfterViewInit {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  @Input() comment!: Comments;
  
  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;
  loading: boolean = false;


  constructor(private route: ActivatedRoute, private userService: UserService,private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    this.getAllPosts(); 
  

  }


    /* 
  This code defines a method createComment that creates a new comment for a specific post. It toggles the visibility of the comment, creates a new comment object with post ID, email, name, and body, then calls the createUserComment method from the userService to send the new comment to the server. It also subscribes to the response and updates the local comment object.
  */
  createComment(postId: number){
    // this.commentVisibility[postId] = !this.commentVisibility[postId];
    let insertComment : Comments ={
      post_id: postId,
      email: this.authService.getCachedUser()?.email,
      name: this.commentName,
      body: this.newComment, 
    }
    return this.userService.createUserComment(postId, insertComment).subscribe((_commentsSubscription)=> this.comment = _commentsSubscription); 
  }

  getAllPosts(){
    this.userService.getAllPosts()
    .subscribe((_userPostSubscription)=> 
    this.userPost = _userPostSubscription); 
    
  }

  
  selectPost(postId: number){
    this.commentVisibility[postId] = !this.commentVisibility[postId];
    this.userService.getPostComments(postId).subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }

  ngOnDestroy(): void {
    // if(this.getUserPosts()){
    //   this.getUserPosts().unsubscribe();
    // }
  }

}
