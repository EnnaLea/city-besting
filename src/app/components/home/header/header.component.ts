import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.model';
import { CacheService } from '../../../services/cache.service';
import { MatDialog } from '@angular/material/dialog';
import { UnsuscribeComponent } from '../../../messages/unsuscribe/unsuscribe.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() user: User | undefined;

  constructor(private router: Router, private cacheService: CacheService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.getProfile();
  }

  openDialog(): void {
    this.dialog.open(UnsuscribeComponent, {
      width: '250px',
    });
  }

  onUnsuscribe(){
    this.openDialog();
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/register');
  }

  getProfile(){
      return localStorage.getItem('profile-img');
  }

}
