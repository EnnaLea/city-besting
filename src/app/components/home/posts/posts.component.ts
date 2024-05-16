import { Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { PaginationInstance } from 'ngx-pagination';



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

  pagination: number = 1;
  allPosts: number = 0;
  
  page: number = 1;
  count: number = 0;
  pageSizes = [20, 50, 100];

  currentPage = 1;
  itemsPerPage = 20; // Imposta il numero predefinito di elementi per pagina
  totalItems = 0; // Totale dei post disponibili
  url: string = 'https://gorest.co.in/public/v2';
  
  


  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router, private http: HttpClient) {
    
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


  getAllPosts() {
    const url = `${this.url}/posts?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
    this.userService.getAllPosts()
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe((_postSubscription) => this.userPost = _postSubscription);
  }
  pageChanged(event: any) {
    this.currentPage = event.page;
    this.getAllPosts(); // Aggiorna la lista dei post quando cambia la pagina
  }


  // renderPage(event: number){
  //   this.pagination = event;
  //   this.getAllPosts();
  // }

  
  
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
