import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../interfaces/user.model';
import { CacheService } from '../services/cache.service';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let cacheService: CacheService;
  let router: Router;
  let user : User;
  let fixture: ComponentFixture<AuthService>;
  let component: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [AuthService, CacheService]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    cacheService = TestBed.inject(CacheService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set tokenExpired to true and call logout after expiration time', fakeAsync(() => {
    // Mock expiration time and current time
    const expirationTime = 5000; // 5 seconds
    const currentTime = 0; // Start time
  
    // Set expiration time and current time in the component
    service.expirationTime = expirationTime;
    service.currentHour = currentTime;
  
    // Spy on the logout method
    spyOn(service, 'logout');
  
    // Call expiredTime method
    service.expiredTime();
  
    // Advance time by expirationTime
    tick(expirationTime);
  
    // Check if localStorage token is removed
    expect(localStorage.getItem('token')).toBeNull();
  
    // Check if tokenExpired is set to true
    expect(service.tokenExpired).toBeTruthy();
  
    // Check if logout method is called
    expect(service.logout).toHaveBeenCalled();
  }));


    it('should return false if email and token dont match', () => {
      // Mock user saved in cacheService
      const userEmail = 'test@example.com';
      localStorage.setItem('email', userEmail)
      // service.cacheService.saveUser(user)?.email = userEmail;
  
      // Mock token stored in localStorage
      const token = 'mockToken';
      localStorage.setItem('token', token);
  
      // Call isLoggedIn method with correct email and token
      const isLoggedIn = service.IsLoggedIn(userEmail, token);
  
      // Expect isLoggedIn to be false
      expect(isLoggedIn).toBeFalsy();
    });

    
  it('should return null if token is not present in local storage', () => {
    localStorage.removeItem('token');
    const tokenValue = cacheService.getToken();
    expect(tokenValue).toBeNull();
  });
});
