import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { Profile } from '../interfaces/profile-img';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  url: string = 'https://gorest.co.in/public/v2';
  subscribed!: boolean;
  logged: boolean | undefined;
  currentTime = new Date().getTime();
  expirationTime = this.currentTime + 60 * 60 * 1000;
  user!: User;
  profile!: Profile[];
  userProfile!: string;
  tokenExpired: boolean = false;


  constructor(
    // private httpService: HttpClient,
    private cacheService: CacheService,
    private router: Router,
   
  ) {
    // console.log(this.profile =[]);
  }


  login(email: string, token: string) {
    if(this.IsLoggedIn(email, token)){
      this.expiredTime();
        localStorage.setItem('profile-img', this.userProfile);
        this.router.navigateByUrl('/landing');
    } else{
      alert('Login failed');
      window.location.reload();
    }  
  }

  expiredTime(){
    setTimeout(() => {
      localStorage.removeItem('token');
      this.tokenExpired = true;
      this.logout();
    }, this.expirationTime - this.currentTime);
  }
  

  /* 
  This code defines a function called IsLoggedIn that checks if the token property is truthy or if there is a 'token' value in the local storage. If either condition is true, it returns true, otherwise it returns false.
  */
  IsLoggedIn(email: string, token: string) {
    if (email == this.cacheService.getUserSaved()?.email
      && token == localStorage.getItem('token')
  ) {
      return true;
    } else{
      return false;
    }
  }

  setCachedUser(user: User) {
    this.cacheService.saveUser(user);
  }

  getCachedUser() {
    return this.cacheService.getUserSaved();
  }

  /*
  This code snippet defines a logout function that removes the 'token' from the localStorage and redirects the user to the '/login' page using Angular's router.
  */
  logout() {
    this.tokenExpired = false;
    return this.router.navigateByUrl('/login');
  }

  /*
  This code defines a getToken method in the AuthService class that retrieves the 'token' value from the local storage.
  */
  getToken() {
    return localStorage.getItem('token');
  }

  
}
