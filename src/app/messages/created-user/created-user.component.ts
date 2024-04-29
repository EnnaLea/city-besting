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
  selector: 'app-created-user',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, MaterialModule],
  templateUrl: './created-user.component.html',
  styleUrl: './created-user.component.scss'
})
export class CreatedUserComponent {

constructor(public dialogRef: MatDialogRef<CreatedUserComponent>) { }
onClick() {
  this.dialogRef.close();
  window.location.reload();
}

}
