import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.model';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() user: User | undefined;

  constructor(private router: Router, private cacheService: CacheService) {
    
   }

  ngOnInit(): void {
    this.getProfile();
  }

   

  onUnsuscribe(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/register');
  }

  getProfile(){
      return localStorage.getItem('profile-img');
  }

}
