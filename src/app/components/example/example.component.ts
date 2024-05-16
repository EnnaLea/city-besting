import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Observable, tap } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';
import { Posts } from '../../interfaces/user-post';
import { Comments } from '../../interfaces/comments';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';



// const DATA: Card[] = [
//   {
//     title: 'Shiba Inu 1',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 2',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 3',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 4',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 5',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 6',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 7',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 8',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 9',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   },
//   {
//     title: 'Shiba Inu 10',
//     subtitle: 'Dog Breed',
//     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
//   }
// ];

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<Posts[]>;
  dataSource: MatTableDataSource<Posts> = new MatTableDataSource<Posts>(this.userPost);


  constructor(private changeDetectorRef: ChangeDetectorRef, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getAllPosts();
    this.changeDetectorRef.detectChanges();
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


  getAllPosts(){
    this.userService.getAllPosts()
    .pipe(tap(() =>     
      this.loading = false))
    .subscribe((data) => {
      this.userPost = data;
      this.dataSource = new MatTableDataSource<Posts>(this.userPost);
      this.dataSource.paginator = this.paginator
    });
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
