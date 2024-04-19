import { Component } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) { }

  onUnsuscribe(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/register');
  }

}
