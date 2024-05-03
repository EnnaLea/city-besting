import { Component } from '@angular/core';
import { MaterialModule } from '../../module/material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth.service';
import { User } from '../../interfaces/user.model';
import { Router } from '@angular/router';


interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
user!: User;

email!: string;
name!: string;
gender!: string;
password!: string;
status!: string;
token!: string;
male!: string;
female!: string;
others!: string;
selectedValue!: string;

registerForm!: FormGroup;

constructor(private authService: AuthService, private userService: UserService, private router : Router, private fb: FormBuilder){
  this.registerForm = this.fb.group({
    name: new FormControl('', [Validators.required]),  
    email: new FormControl('', [Validators.required]), 
    gender: new FormControl('', [Validators.required]), 
    status: new FormControl('', [Validators.required]), 
    // password: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required]),
  }) ; 
}


/*
This code defines an onSubmit method that saves a token to local storage, creates a new user object based on form values, and sends the user data to the authService to create a new user. After creating the user, it sets the user in the cache.
*/
onSubmit() {
  localStorage.setItem('token', this.registerForm.value.token); 
  if (!this.user) {   
    let newUser : User = {
      name : this.registerForm.value.name,
      email: this.registerForm.value.email,
      gender: this.registerForm.value.gender,
      status: this.registerForm.value.status,
      token: this.registerForm.value.token,
      // password: this.registerForm.value.password,
    }
    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        this.authService.setCachedUser(response);
        this.router.navigateByUrl('/login');      
      }
    });
  } 
}

  // Object { id: 6828966, name: "ddd", email: "ddd@gmail.com", gender: "male", status: "active" }
  // Object { id: 6830411, name: "kkk", email: "kkk@example.com", gender: "male", status: "active" }
  // Object { id: 6830418, name: "ooo", email: "ooo@example.com", gender: "female", status: "inactive" }
  // Object {"id":6829564,"name":"aa","email":"aa@gmail.com","gender":"female","status":"active"}

  // let userData: User = {
  //   name: registerForm.value.name,
  //   email: registerForm.value.email,
  //   gender: registerForm.value.gender,
  //   status: 'active',
  // }

  // this.password = registerForm.value.password;

  // localStorage.setItem('token', registerForm.value.token);
  // this.token = registerForm.value.token;

  // if(registerForm.valid){
  //   this.authService.createUser(userData)
  //   .subscribe(userData => this.authService.createUser(userData));
  //   registerForm.reset();
  // }else{
  //   this.registerForm.markAllAsTouched();
  // }
   
// }



}
