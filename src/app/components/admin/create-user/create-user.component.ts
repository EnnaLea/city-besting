import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.model';
import { MaterialModule } from '../../../module/material/material.module';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserInfoComponent } from "../../user/user-info/user-info.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Profile } from '../../../interfaces/profile-img';

// export interface DialogData {
//   message: string;
// }

@Component({
    selector: 'app-create-user',
    standalone: true,
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss',
    imports: [MaterialModule, UserInfoComponent, MatDialogTitle, MatDialogContent]
})
export class CreateUserComponent {
user!: User;

email!: string;
name!: string;
gender!: string;
password!: string;
status!: string;
token!: string;
profileImg!: Array<Profile>;
male!: string;
female!: string;
others!: string;
selectedValue!: string;

registerForm!: FormGroup;

constructor(private authService: AuthService, private userService: UserService, private router : Router, private fb: FormBuilder, public dialog: MatDialog){
  this.registerForm = this.fb.group({
    name: new FormControl('', [Validators.required]),  
    email: new FormControl('', [Validators.required]), 
    gender: new FormControl('', [Validators.required]), 
    status: new FormControl('', [Validators.required]), 
    // token: new FormControl('', [Validators.required]),
  }) ; 
}


/*
This code defines an onSubmit method that saves a token to local storage, creates a new user object based on form values, and sends the user data to the authService to create a new user. After creating the user, it sets the user in the cache.
*/
onSubmit() {
//  localStorage.setItem('token', this.registerForm.value.token);
  if (!this.user) {  
    this.token = this.authService.getToken() || ''
    let newUser : User = {
      name : this.registerForm.value.name,
      email: this.registerForm.value.email,
      gender: this.registerForm.value.gender,
      status: this.registerForm.value.status,
      token: this.token,
      img: ''
    }
    if(newUser.gender === 'male'){
      let maleProfile = '';
      let maleImages = [this.profileImg[1].male.img1, this.profileImg[1].male.img2, this.profileImg[1].male.img3, this.profileImg[1].male.img4,];
      let randomIndex = Math.floor(Math.random() * maleImages.length);
      maleProfile = `../../../assets/mlprofile${maleImages[randomIndex]}`;
      newUser.img = maleProfile;
    } else {
      let femaleProfile = '';
      let femaleImages = [this.profileImg[0].female.img1, this.profileImg[0].female.img2, this.profileImg[0].female.img3, this.profileImg[0].female.img4,];
      let randomIndex = Math.floor(Math.random() * femaleImages.length);
      femaleProfile = `../../../assets/fmprofile${femaleImages[randomIndex]}`;
      newUser.img = femaleProfile;
    }

    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        this.user = response;
        alert("User created successfully:  " + JSON.stringify(response));
      }
    });
  } 
}

// openDialog(text: string) {
//   this.dialog.open(DialogDataExampleDialog, {
//     data: {
//       message: text,
//     },
//   });
// }


onSave() {
  const userId = this.getUserId();
  let changeUser : User = {
    name : this.name,
    email : this.email,
    gender : this.gender,
    status : this.status
  }

  console.log(changeUser);
  console.log(userId);
  if (userId !== undefined){
    return this.userService.updateUser(userId, changeUser).subscribe((_user) => {
      this.user = _user;
      this.authService.setCachedUser(this.user);
      alert('Changes saved');
      // window.location.reload();
    });
  } else {
    console.error('User ID is undefined');
  }
  return;
}


  onCancel() {
  throw new Error('Method not implemented.');
  }

  getUser(){
    const cachedUser = this.authService.getCachedUser();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user;
  }

  getUserId(){
    const cachedUser = this.authService.getCachedUser();
    if (cachedUser !== null) {
        this.user = cachedUser;
    }
    return this.user.id;
  }

  // getToken(){
  //   return this.authService.getToken();
  // }


}


// @Component({
//   selector: 'dialog-data-example-dialog',
//   template: `<h2 mat-dialog-title>Alert</h2>
//   <!-- <mat-dialog-content> -->
//     <p>{{ data.message }}</p>
//   <!-- </mat-dialog-content>  -->
//   `,
//   standalone: true,
//   imports: [MaterialModule, CommonModule],
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }
