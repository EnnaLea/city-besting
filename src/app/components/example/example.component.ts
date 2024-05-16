import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Observable, tap } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { Posts } from '../../interfaces/user-post';
import { Comments } from '../../interfaces/comments';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MaterialModule, CommonModule, LoaderComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  @Input() comment!: Comments;
  

  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;
  loading: boolean = true;
  isComment: boolean = false

  length = 50;
  pageSize = 20;
  pageIndex = 1;
  pageEvent!: PageEvent;
  dataSource: MatTableDataSource<Posts> = new MatTableDataSource<Posts>(this.userPost);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getAllPosts();
    // this.changeDetectorRef.detectChanges();
    // this.obs = this.dataSource.connect();
  }


  createComment(postId: number){
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
  //   .subscribe((data) => {
  //     this.userPost = data;
  //     this.dataSource = new MatTableDataSource<Posts>(this.userPost);
  //     this.dataSource.paginator = this.paginator
  //   });
  // }

  getAllPosts() {
    this.userService.getTotPosts(this.pageIndex, this.pageSize)
      .pipe(
        tap((data: Posts[]) => {
          this.userPost = data;
          this.dataSource = new MatTableDataSource<Posts>(this.userPost);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        })
      )
      .subscribe();
  }

  
  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    
  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  
  selectPost(postId: number){
    this.commentVisibility[postId] = !this.commentVisibility[postId];
    this.userService.getPostComments(postId)
    .pipe(tap(() => this.isComment = true))
    .subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }


  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
