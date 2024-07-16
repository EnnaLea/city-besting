import { Component, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MaterialModule } from '../../module/material/material.module';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { InvalidLoginComponent } from '../../messages/invalid-login/invalid-login.component';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';






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
loginForm!: FormGroup;


  constructor(private http: HttpClient,private router: Router, private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    })
        
  }

  onInit() {

  }

    login(email: string, token: string) {
    //console.log(email);
    //console.log(token);
    console.log(this.authService.IsLoggedIn(email,token));

    //if (
      //email !== undefined && token !== undefined
    //) {
        if(!this.authService.IsLoggedIn(email,token)) {
          this.authService.openDialog();         
        } else{
          this.router.navigateByUrl('/landing');
        }
          
  }



onLogin() {
  let params = {
    email: this.loginForm.value.email,
    token: this.loginForm.value.token
  }
localStorage.setItem('timeout', String(this.authService.expirationTime));
  this.login(params.email, params.token);
  this.loading = false;

}


}
