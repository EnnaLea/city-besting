import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Posts } from '../../../interfaces/user-post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../module/material/material.module';
// import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../../interfaces/comments';
import { User } from '../../../interfaces/user.model';
import { AuthService } from '../../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';

import { Profile } from '../../../interfaces/profile-img';
import { LoaderComponent } from '../../loader/loader.component';
import { NoPostsComponent } from '../../../messages/no-posts/no-posts.component';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoaderComponent, NoPostsComponent],
  templateUrl: './admin-post.component.html',
  styleUrl: './admin-post.component.scss'
})
export class AdminPostComponent implements OnInit, AfterViewInit{
  isSpinnerActive: any;

  @Input() userPost!: Array<Posts>;
  // @Input() adminPost!: Array<newPosts>;
  @Input() comments!: Array<Comments>;
  @Input() user!: User;
  @Input() comment!: Comments;

  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;
  imgProfile!: string;
  profile!: Array<Profile>;
  loading: boolean = true;
  isPost: boolean= true;


  constructor(private route: ActivatedRoute, private userService: UserService, private cacheService: CacheService, private router: Router) {}


  ngOnInit(): void {
    this.getAdminPosts();
    console.log(this.getAdminPosts());
  }

  /* 
  This TypeScript code defines a lifecycle hook method ngAfterViewInit in an Angular component. When the component's view has been fully initialized, it calls the getUserPosts method.
  */
  ngAfterViewInit(): void {
    // console.log(this.getAdminPosts());
    // console.log(this.getAdminId());
    // this.getAdminPosts();
  }  
  
  ngAfterContentInit(): void {

  }
  
  // setViewPost(){
  //   if(this.getUserPosts == undefined){
  //     return this.getAdminPosts();
  //   }else{
  //     return this.getUserPosts();
  //   }
  // }
  onDetailsClick(){
    this.router.navigateByUrl('/landing/new-post');
  }


  goBack(){
    this.router.navigate(['/landing/user-info']);
  }

  getAdminPosts(){   
    const id: number = Number(this.getAdminId());     
      this.userService.getUserPosts(id)
      .pipe(tap(() => this.loading = false))
      .subscribe((_userPostSubscription)=> 
        this.userPost = _userPostSubscription);
      
      
  }

  profileImg(){
    return localStorage.getItem('profile-img');
  }

  /* 
  This code defines a method createComment that creates a new comment for a specific post. It toggles the visibility of the comment, creates a new comment object with post ID, email, name, and body, then calls the createUserComment method from the userService to send the new comment to the server. It also subscribes to the response and updates the local comment object.
  */
  createComment(postId: number){
    // this.commentVisibility[postId] = !this.commentVisibility[postId];
    let insertComment : Comments ={
      post_id: postId,
      email: this.cacheService.getUserSaved()?.email,
      name: this.commentName,
      body: this.newComment, 
    }
    return this.userService.createUserComment(postId, insertComment).subscribe((_commentsSubscription)=> this.comment = _commentsSubscription); 
  }

/* 
This code defines a function selectPost that toggles the visibility of comments for a specific post by updating the commentVisibility property. It then fetches comments for that post through the userService, subscribes to the response, and assigns the comments to the local comments property.
*/  
  selectPost(postId: number){
    this.commentVisibility[postId] = !this.commentVisibility[postId];
    return this.userService.getPostComments(postId).subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }

  /* 
  This TypeScript code defines a method getUserId that retrieves the value of the 'id' parameter from the current route snapshot and returns it.
  */
  getUserId(){
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }

    /* 
    This TypeScript code defines a method getAdminId which retrieves the cached user's ID from this.authService and returns it. The ?. is the optional chaining operator, which avoids errors if this.authService.getCachedUser() is null or undefined.
  */
  getAdminId(){
    const id = this.cacheService.getUserSaved()?.id;
    return id;
  }

  /*
  This code is executing in the ngOnDestroy lifecycle hook. It's checking if getUserPosts and getAdminPosts return truthy values and then calls unsubscribe on the result of these two functions. This is a common pattern for unsubscribing from observables to prevent memory leaks.
  */
  ngOnDestroy(): void {
    // if( this.getAdminPosts()){
    //   this.getAdminPosts().unsubscribe();
    // }
  }
}
