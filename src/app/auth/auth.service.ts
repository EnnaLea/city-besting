import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { Profile } from '../interfaces/profile-img';
import { MatDialog } from '@angular/material/dialog';
import { InvalidLoginComponent } from '../messages/invalid-login/invalid-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  //url: string = 'https://gorest.co.in/public/v2';
  subscribed!: boolean;
  logged: boolean | undefined;
  currentHour = new Date().getHours();
  currentMinutes = new Date().getMinutes();
  //currentTime = this.currentHour + ':' + this.currentMinutes;
  expirationTime = this.currentHour + 1;
  user!: User;
  profile!: Profile[];
  userProfile!: string;
  tokenExpired: boolean = false;
  credential!: boolean;

  constructor(
    // private httpService: HttpClient,
    private cacheService: CacheService,
    private router: Router,
    public dialog: MatDialog
  ) {}

ngOnInit() {

 //console.log(this.getCurrentTime());
}

  openDialog(): void {
    this.dialog.open(InvalidLoginComponent, {
      width: '250px',
    });
  }

  login(email: string, token: string) {
        
        //localStorage.setItem('token', token);
        if(!this.IsLoggedIn(email, token)) {
          this.openDialog();          
        } else{
          this.router.navigateByUrl('/landing');
        }
          
  }


  expiredTime(){
    let currentHour = new Date().getHours();
    console.log("current hour is: " + currentHour);
    let expiration = Number(localStorage.getItem('timeout'));
    console.log("expiration hour is: " + expiration);
    if(currentHour >= expiration){
      setTimeout(() => {
        //this.tokenExpired = true;
        //localStorage.removeItem('token');       
        //localStorage.removeItem('current');       
        localStorage.removeItem('timeout');       
        this.logout();
      })
    }
  }


  /* 
  This code defines a function called IsLoggedIn that checks if the token property is truthy or if there is a 'token' value in the local storage. If either condition is true, it returns true, otherwise it returns false.
  */
  IsLoggedIn(email: string, token: string) : boolean{
    //console.log(email);
    //console.log(token);
    //console.log(this.cacheService.getUserSaved()?.email);
    //console.log(this.cacheService.getToken());
    if (
      email == this.cacheService.getUserSaved()?.email && token == this.cacheService.getToken()
    ) {

      return true;
    } else {
      return false;
    }
    
  }





  /*
  This code snippet defines a logout function that removes the 'token' from the localStorage and redirects the user to the '/login' page using Angular's router.
  */
  logout() {
    //this.tokenExpired = false;
    return this.router.navigateByUrl('/login');
  }

  /*
  This code defines a getToken method in the AuthService class that retrieves the 'token' value from the local storage.
  */

  getTokenRegistered(){
    let token = localStorage.getItem('token');
    if(token != null){
      return token;
    }
    return null;
  }


}