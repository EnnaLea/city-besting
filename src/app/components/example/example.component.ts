import { ChangeDetectorRef, Component, Input, ViewChild, numberAttribute } from '@angular/core';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MaterialModule, CommonModule, LoaderComponent, JsonPipe],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {

  @Input() userPost!: Array<Posts>;
  @Input() comments!: Array<Comments>;
  @Input() comment!: Comments;
  posts!: Posts[];
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
  
  
  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.loadPosts();
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


  // loadPosts(): void {
  //   this.userService.getPosts(this.pageIndex + 1, this.pageSize)
  //     .subscribe((posts: Posts[]) => {
  //       this.userPost = posts;
  //       setTimeout(()=>{
  //         this.dataSource = new MatTableDataSource<Posts>(this.userPost);
  //         this.totalArray = this.dataSource.data.length;
  //       }, 0)
  //       this.loading = false;
  //     });     
  // }

  loadPosts(): void {
    this.userService.getPosts(this.pageIndex + 1, this.pageSize)
      .subscribe((response: Posts[]) => {
        this.userPost = response.p;
        setTimeout(() => {
          this.dataSource = new MatTableDataSource<Posts>(this.userPost);
          this.totalArray = response.total; // Usa il valore restituito dal servizio
          this.paginator.length = this.totalArray; // Imposta la proprietà length di mat-paginator
        }, 0);
        this.loading = false;
      });
  }
  
  

// getLength(){
//   this.userService.getPosts(this.pageIndex + 1, this.pageSize)
//   .subscribe(
//     (response: Posts[]) => {
//       this.totalArray = this.userService.getPosts(this.pageIndex + 1, this.pageSize).pipe
//     }
//   )
//   console.log(this.totalArray);
//   return this.totalArray
  
// }

  // loadPosts(): void {
  //   this.userService.getPosts(this.pageIndex + 1, this.pageSize, this.getLength())
  //     .subscribe((posts: Posts[]) => {
  //       this.userPost = posts;
  //       setTimeout(()=>{
  //         this.dataSource = new MatTableDataSource<Posts>(this.userPost);
  //         this.totalArray = posts.length;
  //       }, 0)
  //       this.loading = false;
  //     });     
  // }

  
  onPageChange(event: PageEvent): void {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // this.totalArray = this.dataSource.data.length
    this.loadPosts();
  }

  
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
