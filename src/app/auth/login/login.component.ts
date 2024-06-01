import { Component, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MaterialModule } from '../../module/material/material.module';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { InvalidLoginComponent } from '../../messages/invalid-login/invalid-login.component';






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

@Input()email!: string;
@Input() token!: string;
loading: boolean = true;


  constructor(private http: HttpClient,private router: Router, private authService: AuthService) {

  }

  ngOnInit(){
  }



onLogin() {
  this.authService.login(this.email, this.token);
  this.loading = false;

}


}
