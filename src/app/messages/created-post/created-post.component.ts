import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '../../module/material/material.module';

@Component({
  selector: 'app-created-post',
  standalone: true,
  imports: [  MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MaterialModule],
  templateUrl: './created-post.component.html',
  styleUrl: './created-post.component.scss'
})
export class CreatedPostComponent {

  constructor(public dialogRef: MatDialogRef<CreatedPostComponent>){}

  onPostCreated() {
    this.dialogRef.close();
    window.location.reload();
  }
}
