import { AfterViewInit, Component, Input } from '@angular/core';
import { Comments } from '../../interfaces/comments';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../module/material/material.module';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Posts } from '../../interfaces/user-post';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements AfterViewInit {
  @Input() comments!: Array<Comments>;
  @Input() postId!: number; // Receive the selected postId


  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.getUserPostComments();
  }

  getUserPostComments(){
    // const id = 116922
    return this.userService.getPostComments(Number(this.postId)).subscribe((_commentsSubscription)=> this.comments = _commentsSubscription);
  }

  ngOnDestroy(): void {
    if(this.getUserPostComments()){
      this.getUserPostComments().unsubscribe();
    }
  }

}
