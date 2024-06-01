import { Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MaterialModule } from '../../module/material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid-login',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MaterialModule],
  templateUrl: './invalid-login.component.html',
  styleUrl: './invalid-login.component.scss'
})
export class InvalidLoginComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InvalidLoginComponent>,  private router: Router) { }

  onInvalid(){
    this.router.navigateByUrl('/register');
  }

  onRetry(){
    this.dialogRef.close();
  }
}
