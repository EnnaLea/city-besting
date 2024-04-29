import { Component, Inject, Input } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MaterialModule } from '../../module/material/material.module';
import { Comments } from '../../interfaces/comments';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-created-comment',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, MaterialModule],
  templateUrl: './created-comment.component.html',
  styleUrl: './created-comment.component.scss'
})
export class CreatedCommentComponent {

  @Input() comments!: Array<Comments>;
  // @Input() user!: User;
  @Input() comment!: Comments;

  selectedPost: any;
  commentVisibility: { [postId: number]: boolean } = {};
  newComment!: string;
  commentName!: string;
  commentEmail!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreatedCommentComponent>,private route: ActivatedRoute, private userService: UserService, private authService: AuthService, private router: Router,){}

  onCreatedComment(){
    // let insertComment : Comments ={
    //   post_id: this.data.postId,
    //   email: this.authService.getCachedUser()?.email,
    //   name: this.commentName,
    //   body: this.newComment, 
    // }
    // this.userService.createUserComment(this.data.postId, insertComment).subscribe((_commentsSubscription)=> this.comment = _commentsSubscription); 

    // console.log(this.userService.createUserComment(this.data.postId, insertComment).subscribe((_commentsSubscription)=> this.comment = _commentsSubscription));
    this.dialogRef.close();


  }


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



}
