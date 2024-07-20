import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, EventEmitter, Output, numberAttribute } from '@angular/core';
import { Posts } from '../../../interfaces/user-post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../module/material/material.module';
// import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../../interfaces/comments';
import { LoaderComponent } from '../../loader/loader.component';
import { tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationInstance } from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import { CacheService } from '../../../services/cache.service';



@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  // changeDetection: ChangeDetectionStrategy.Default
  //comment this if getAllPosts doesn't work
})
export class PostsComponent implements OnInit {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  @Input() comment!: Comments;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

@Input() id!: string;
@Input() maxSize!: number;
@Output() pageChange!: EventEmitter<number>;
@Output() pageBoundsCorrection!: EventEmitter<number>;

  
  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;
  loading: boolean = true;
  isComment: boolean = false

   // pagination
   @Input({ transform: numberAttribute }) length!: number 
   totalArray!: number;
   pageSizeOptions: number[] = [10, 30, 50];
   pageSize: number = 10;
   currentPage: number = 1;
   showFirstLastButtons = true;
   pageIndex = 0;
   pageEvent!: PageEvent;
   dataSource: MatTableDataSource<Posts> = new MatTableDataSource<Posts>(this.userPost);
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  


  constructor(private route: ActivatedRoute, private userService: UserService, private cacheService: CacheService, private router: Router, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.getAllPosts();
    // console.log(this.getAllPosts()); 
  }


    /* 
  This code defines a methostartIndex: number, endIndex: numberstartIndex: number, endIndex: numberd createComment that creates a new comment for a specific post. It toggles the visibility of the comment, creates a new comment object with post ID, email, name, and body, then calls the createUserComment method from the userService to send the new comment to the server. It also subscribes to the response and updates the local comment object.
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

  // getAllPosts(){
  //   this.userService.getAllPosts()
  //   .pipe(tap(() =>     
  //     this.loading = false))
  //   .subscribe((_postSubscription)=> 
  //   this.userPost = _postSubscription);
  // }

  // getAllPosts(){

  //   this.userService.getTotPosts(this.pagination)
  //   .pipe(tap(() => this.loading = false))
  //   .subscribe((_postSubscription) => {
  //     this.userPost = _postSubscription;
  //     this.allPosts = _postSubscription.length;
  //     console.log(this.allPosts);
      
  //   })
  // }


  // getAllPosts() {
  //   const url = `${this.url}/posts?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
  //   this.userService.getAllPosts()
  //     .pipe(
  //       tap(() => this.loading = false)
  //     )
  //     .subscribe((_postSubscription) => this.userPost = _postSubscription);
  // }
  // pageChanged(event: any) {
  //   this.currentPage = event.page;
  //   this.getAllPosts(); 
  // }


  // renderPage(event: number){
  //   this.pagination = event;
  //   this.getAllPosts();
  // }

  getAllPosts(): void {
    this.userService.getPosts(this.pageIndex + 1, this.pageSize)
      .subscribe((posts: Posts[]) => {
        this.userPost = posts;
        setTimeout(()=>{
          this.dataSource = new MatTableDataSource<Posts>(this.userPost);
          this.totalArray = posts.length + 300;
        }, 0)
        this.loading = false;
      });     
  }

  
  onPageChange(event: PageEvent): void {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllPosts();
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
