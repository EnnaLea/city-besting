import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Posts } from '../../../interfaces/user-post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../module/material/material.module';
// import { CommentsComponent } from '../comments/comments.component';
import { Comments } from '../../../interfaces/comments';
import { LoaderComponent } from '../../loader/loader.component';
import { BehaviorSubject, Observable, finalize, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { PagingConfig } from '../../../interfaces/paging';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoaderComponent, PaginatorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements AfterViewInit {


  @Input() userPost!: Array<Posts>;
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
  total!: number;
  page: number = 20;

  pagingConfig!: PagingConfig;
  itemsPerPage: number = 20;
  totalItems: number = 0;


  pageChange: any;
  pageBoundsCorrection: any;


  currentPage!:number;
  searchParam:string = "";
  searchValue:string = "";
  perPageParam:number = 10;
  isForwardAvailable!:boolean;
  isForwardMoreAvailable!:boolean;


  // length = 50;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25, 50, 100];

  // hidePageSize = false;
  // showPageSizeOptions = true;
  // showFirstLastButtons = true;
  // disabled = false;
  // pageEvent!: PageEvent;


  constructor(private route: ActivatedRoute, private userService: UserService,private authService: AuthService, private router: Router) {

  }

  ngAfterViewInit(): void {
    this.getAllPosts(); 

    // this.currentPage = 1;
    // this.searchParam = "";
    // this.searchValue = "";
    // this.perPageParam = 10;

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
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

  // getAllPosts(){
  //   this.userService.getAllPosts()
  //   .pipe(tap(() =>     
  //     this.loading = false))
  //   .subscribe((_userPostSubscription)=> 
  //   this.userPost = _userPostSubscription);    
  // }

  getAllPosts(){
    this.userService.getAllPosts()
    .subscribe(res => {
      this.userPost = res;
      this.pagingConfig.totalItems = res.length;
      this.loading = false;
    })
  }


  // getAllPosts(){
  //   this.userService.getTotPosts(this.page)
  //   .pipe(tap(() => this.loading = false))
  //   .subscribe((res: any )=> {
  //     this.userPost = res.data;
  //     this.total = res.total;
  //     this.pagingConfig.totalItems = res.length;
  //   })
  // }
  
  // getAllPosts(){
  //   this.userService.getTotPosts(this.currentPage, this.perPageParam, this.searchParam, this.searchValue)
  //   .pipe(tap(() => this.loading = false));
  // }

  // nextPageByPagination($event: number) {
  //   this.userService.getTotPosts(this.currentPage, this.perPageParam, this.searchParam, this.searchValue)
  //   .pipe(tap(() => this.loading = false));
  //   }


  // pageChangeEvent(event: number){
  //     this.page = event;
  //     this.getAllPosts();
  // }


  onPageChange(event: any){
    this.pagingConfig.currentPage = event
    this.getAllPosts();
  }

  // // onPageSizeChange(event: any): void{
  // //   this.pagingConfig.itemsPerPage = event.target.value;
  // //   this.pagingConfig.currentPage = 1;
  // //   this.getAllPosts();

  // // }
  
  
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
