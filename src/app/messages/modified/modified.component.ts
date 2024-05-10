import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../module/material/material.module';

@Component({
  selector: 'app-modified',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, MaterialModule],
  templateUrl: './modified.component.html',
  styleUrl: './modified.component.scss'
})
export class ModifiedComponent {

  constructor(public dialogRef: MatDialogRef<ModifiedComponent>){}
  onClick() {
    this.dialogRef.close();
    window.location.reload();
  }
}
