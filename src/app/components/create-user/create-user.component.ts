import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.model';
import { MaterialModule } from '../../module/material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MaterialModule, ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

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

constructor(private authService: AuthService, private router : Router, private fb: FormBuilder){
  this.registerForm = this.fb.group({
    name: new FormControl('', [Validators.required]),  
    email: new FormControl('', [Validators.required]), 
    gender: new FormControl('', [Validators.required]), 
    status: new FormControl('', [Validators.required]), 
    password: new FormControl('', [Validators.required]),
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
    }

    this.authService.createUser(newUser).subscribe({
      next: (response) => {
        this.authService.setCachedUser(response);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }
    });
  } 
}


}
