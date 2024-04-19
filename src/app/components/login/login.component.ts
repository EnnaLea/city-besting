import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../module/material/material.module';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

email!: string;
// password!: string;
token!: string;
toasterService = inject(ToastrService);

  // loginObj: Login

  constructor(private http: HttpClient,private router: Router, private authService: AuthService) {
    // this.loginObj = new Login();
  }

  ngOnInit(){
    // if(this.authService.IsLoggedIn(this.token, this.email, this.password)){
    //   this.router.navigateByUrl('/landing');
    // }
  }


onLogin() {
 this.authService.login(this.email, this.token);
}


}
