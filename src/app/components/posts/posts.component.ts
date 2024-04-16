import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Posts } from '../../interfaces/user-post';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../module/material/material.module';
import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../interfaces/comments';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, CommentsComponent, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements AfterViewInit {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  selectedPost: any;

  commentVisibility: { [postId: number | string]: boolean } = {};

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngAfterViewInit(): void {
    this.getAllPosts();   
  }

  // getUserPosts(){
  //   const id = this.route.snapshot.paramMap.get('id');
  //   return this.userService.getUserPosts(Number(id))
  //   .subscribe((_userPostSubscription)=> this.userPost = _userPostSubscription);
  // }

  getAllPosts(){
    return this.userService.getAllPosts().subscribe((_userPostSubscription)=> this.userPost = _userPostSubscription);
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
