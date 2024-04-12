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

  constructor(
    private httpService: HttpClient,
    private cacheService: CacheService,
    private router: Router
  ) {}

  login(email: string, password: string, token: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('token', token);
    this.token = token;
    setTimeout(() => {
      this.logout();
    }, this.expirationTime - this.currentTime);
  }

  /* 
  This code defines a getter function called IsLoggedIn that checks if the token property is truthy or if there is a 'token' value in the local storage. If either condition is true, it returns true, otherwise it returns false.
  */
  get IsLoggedIn() {
    if (this.token || localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setCachedUser(user: User) {
    this.cacheService.saveUser(user);
  }

  getCachedUser() {
    return this.cacheService.getUserSaved();
  }

  //method to check if a user have already done the registration using the method cacheNewUser()
  /*
  This code snippet checks if a user is authenticated by retrieving user and auth information from the local storage. It then determines if the user is logged in based on the presence of user information and a valid authentication token with a non-expired expiration time.
  */
  // public checkAuth() {
  //   const userStr = localStorage.getItem('user');
  //   const authStr = localStorage.getItem('auth');
  //   this.subscribed = userStr !== null;
  //   if (userStr) {
  //     const user = JSON.parse(userStr) as User;
  //     const auth = authStr ? JSON.parse(authStr) as Auth : undefined;
  //     this.logged = auth && new Date().getTime() < this.expirationTime;
  //     this.loggedUser = this.logged ? user : undefined;
  //   } else {
  //     this.logged = false;
  //     this.loggedUser = undefined;
  //   }
  // }

  createUser(user: User): Observable<User> {
    const url = `${this.url}/users`;
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.httpService.post<User>(url, user, { headers: header });
  }



  /*
  This TypeScript code defines a function getHeaders that creates a new HTTP header object with an 'Authorization' field containing a token retrieved by calling the getToken method.
  */
  getHeaders() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return header;
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
