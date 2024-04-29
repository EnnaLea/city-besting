import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MaterialModule } from '../../../module/material/material.module';
import { UserService } from '../../../services/user.service';
import { UserDetail } from '../../../interfaces/user-detail';
import { Subscription, map, tap } from 'rxjs';
import { Posts } from '../../../interfaces/user-post';
import { Comments } from '../../../interfaces/comments';
import { PostsComponent } from '../../home/posts/posts.component';
// import { CommentsComponent } from "../comments/comments.component";
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { LoaderComponent } from '../../loader/loader.component';


@Component({
    selector: 'app-users-details',
    standalone: true,
    templateUrl: './users-details.component.html',
    styleUrl: './users-details.component.scss',
    imports: [CommonModule, MaterialModule, PostsComponent, UserPostsComponent, LoaderComponent]
})
export class UsersDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() userDetail!: UserDetail;
  @Input() userPost!: Posts[];
  userDetailSubscription!: Subscription;
  loading: boolean = true;




  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
    
  }

  ngAfterViewInit(): void {
    this.getUserDetail();
  }

  goBack(){
    this.router.navigate(['/landing/home']);
  }

  getUserDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    return this.userService.getUserDetail(Number(id))
    .pipe(tap(() => this.loading = false))
    .subscribe((userDetailSubscription)=> this.userDetail = userDetailSubscription);
  }
  
  ngOnDestroy(): void {
    if(this.userDetailSubscription){
      this.userDetailSubscription.unsubscribe();
    }
  }

}
