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
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-unsuscribe',
  standalone: true,
  imports: [  MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MaterialModule],
  templateUrl: './unsuscribe.component.html',
  styleUrl: './unsuscribe.component.scss'
})
export class UnsuscribeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UnsuscribeComponent>, private userService: UserService, private router: Router) { }

  onUnsuscribeClick(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/register');
  }
}
