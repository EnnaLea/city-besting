import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Posts } from '../../../interfaces/user-post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../module/material/material.module';
// import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../../interfaces/comments';
import { LoaderComponent } from '../../loader/loader.component';
import { BehaviorSubject, Observable, finalize, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../../paginator/paginator.component';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoaderComponent, PaginatorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements AfterViewInit {

  @Input() userPost!: Array<Posts>;
  @Input() posts!: Array<Posts>
  @Input() comments!: Array<Comments>;
  @Input() comment!: Comments;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;
  loading: boolean = true;
  isComment: boolean = false
  totalPosts!: number;


  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;


  constructor(private route: ActivatedRoute, private userService: UserService,private authService: AuthService, private router: Router) {

  }

  ngAfterViewInit(): void {
    // this.getAllPosts(); 
    // this.loadPosts(0, 20);
    // this.refreshData();
  

  }


    /* 
  This code defines a methostartIndex: number, endIndex: numberstartIndex: number, endIndex: numberd createComment that creates a new comment for a specific post. It toggles the visibility of the comment, creates a new comment object with post ID, email, name, and body, then calls the createUserComment method from the userService to send the new comment to the server. It also subscribes to the response and updates the local comment object.
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
    .pipe(tap(() =>     
      this.loading = false))
    .subscribe((_userPostSubscription)=> 
    this.userPost = _userPostSubscription);    
  }


  // public pageChanged(page: number) {
  //   this.page$.next(page);
  // }

  
  // public refreshData(): void {
  //   this.userService.getTotPosts(this.page, this.itemsPerPage)
  //   .pipe(tap(()=> 
  //     this.loading = false
  //    ))
  //   .subscribe(
  //     (_userPostSubscription)=> 
  //       this.userPost = _userPostSubscription
  //     );
  // }

  // public pageChanged() {
  //   this.refreshData();
  // }

  
  loadPosts(pageIndex: number, pageSize: number): void {
    this.userService.getTotPosts(pageIndex * pageSize, pageSize)
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe(posts => {
        this.userPost = posts;
      });
  }


  // getAllPosts(){
  // //   this.userService.getAllPosts()
  // //   .pipe(tap(posts => 
  // //     this.length = posts.length
  // //     ))
  // //   .subscribe( posts=> 
  // //   this.userPost = posts;
  // //   this.loading = false;
  // // ); 
    
  // // }


  // getAllPosts(): void {
  //   this.userService.getAllPosts().pipe(
  //     tap(posts => {
  //       this.paginator.pageSize = 20; 
  //       this.paginator.pageIndex = 0; 
  //       this.paginator.pageSizeOptions = [5, 10, 20, 30, 50, 100]; 
  //     })
  //   ).subscribe(posts => {
  //     this.userPost = posts;
  //     this.loading = false;
  //   });
  // }

  // getAllPosts(): void {
  //   this.userService.getAllPosts().pipe(
  //     tap(posts => {
  //       this.totalPosts = posts.length;
  //     })
  //   ).subscribe(posts => {
  //     this.userPost = posts.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  //     this.loading = false;
  //   });
  // }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;   
  }
  
  
  selectPost(postId: number){
    this.commentVisibility[postId] = !this.commentVisibility[postId];
    this.userService.getPostComments(postId)
    .pipe(tap(() => this.isComment = true))
    .subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }

  ngOnDestroy(): void {
    // if(this.getUserPosts()){
    //   this.getUserPosts().unsubscribe();
    // }
  }

}
