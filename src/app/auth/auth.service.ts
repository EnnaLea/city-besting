import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { Auth } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null | undefined;
  url: string = 'https://gorest.co.in/public/v2';
  subscribed!: boolean;
  logged: boolean | undefined;
  currentTime = new Date().getTime();
  expirationTime = this.currentTime + 60 * 60 * 1000;
  loggedUser: User | undefined;
  isTokenExpired: boolean = false;

  constructor(
    private httpService: HttpClient,
    private cacheService: CacheService,
    private router: Router,
   
  ) {}


  login(email: string, token: string) {
    if(this.IsLoggedIn(token, email)){
        setTimeout(() => {
          this.logout();
        }, this.expirationTime - this.currentTime);
        this.router.navigateByUrl('/landing');
    } else{
      alert('Login failed');
      window.location.reload();
    }  
  }

  /* 
  This code defines a function called IsLoggedIn that checks if the token property is truthy or if there is a 'token' value in the local storage. If either condition is true, it returns true, otherwise it returns false.
  */
  IsLoggedIn(token: string, email: string) {
    if (email === this.cacheService.getUserSaved()?.email
    && token === localStorage.getItem('token')) {
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
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  /*
  This code defines a getToken method in the AuthService class that retrieves the 'token' value from the local storage.
  */
  getToken() {
    return localStorage.getItem('token');
  }
}
