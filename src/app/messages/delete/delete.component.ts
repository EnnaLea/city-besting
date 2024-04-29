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
import { UserPostsComponent } from '../../components/user/user-posts/user-posts.component';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { UsersComponent } from '../../components/user/users/users.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, MaterialModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  @Input() users!: Array<User>;
   
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteComponent>, private userService: UserService, private route: Router) {}

  onDeleteClick(){
    this.dialogRef.close();
  }

}
