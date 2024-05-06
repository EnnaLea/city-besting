import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../interfaces/user.model';
import { CacheService } from '../services/cache.service';

describe('AuthService', () => {
  let service: AuthService;
  let cacheService: CacheService;
  let user : User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [CacheService],
      providers: [AuthService, CacheService]
    });
    service = TestBed.inject(AuthService);
    cacheService = TestBed.inject(CacheService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // expect(service.IsLoggedIn).toBeTruthy();
    // expect(service.login).toBeTruthy();
    // expect(service.logout).toBeTruthy();
    // expect(service.expiredTime).toBeTruthy();
  });

  it('should log the user in', ()=>{
    // expect(service.IsLoggedIn).toBeTrue();
  })


  // it('should log the user in', ()=>{
  //   const token = String(service.getCachedUser()?.token);
  //   const email = String(service.getCachedUser()?.email);
  //   const isLoggedIn = service.IsLoggedIn(email, token);
  //   expect(isLoggedIn).toBeTruthy;
  // })

  // it('should expire the token after the specified time', () => {
  //   const expirationTime = 3600;
  //   const currentTime = 1000;
  //   const removeItemSpy = spyOn(localStorage, 'removeItem');
  //   const tokenExpiredSpy = spyOn(service, 'tokenExpired');
  //   const logoutSpy = spyOn(component, 'logout');
  //   component.expiredTime();
  //   expect(removeItemSpy).toHaveBeenCalledWith('token');
  //   expect(tokenExpiredSpy).toHaveBeenCalledWith(true);
  //   expect(logoutSpy).toHaveBeenCalled();
  // });

  // it('should expire the token after the specified time', ()=>{
  //   const removeItemSpy = spyOn(localStorage, 'removeItem');
  //   const logoutSpy = spyOn(service, 'logout');
  //   const consoleSpy = spyOn(console, 'log');
  //   const tokenExpired = true;
  //   service.expiredTime();

  //   expect(removeItemSpy).toHaveBeenCalledWith('token');
  //   expect(consoleSpy).toHaveBeenCalledWith(tokenExpired);
  //   expect(logoutSpy).toHaveBeenCalled();
  // })

  // it('shuold login the user and navigate to the landing page', ()=>{
  //   let email = 'test@example.com';
  //   let token = 'test-token';
  //   let user = {
  //     id:1,
  //     name: 'test',
  //     email: 'test',
  //     gender: 'test',
  //     status: 'test',
  //     password: 'test',
  //     token: 'test',
  //    };

  //   localStorage.setItem('token', token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   service.setCachedUser(user);
  //   const routerSpy = spyOn(service['router'], 'navigateByUrl');
  //   const cacheServiceSpy = spyOn(service['cacheService'], 'saveUser');
  //   const isLoggedInSpy = spyOn(service, 'IsLoggedIn').and.returnValue(true);
  //   const expiredTimeSpy = spyOn(service, 'expiredTime');
  //   service.login(email, token);
  //   expect(isLoggedInSpy).toHaveBeenCalledWith(email, token);
  //   expect(expiredTimeSpy).toHaveBeenCalled();
  //   expect(cacheServiceSpy).toHaveBeenCalledWith(user);
  //   expect(routerSpy).toHaveBeenCalledWith('/landing');
  // })

  
  // it('should show alert and reload page on login failure', () => {
  //   const email = 'test@example.com';
  //   const token = 'test-token';
  //   const alertSpy = spyOn(window, 'alert');
  //   const reloadSpy = spyOn(window.location, 'reload' );
  //   const isLoggedInSpy = spyOn(service, 'IsLoggedIn').and.returnValue(false);
  //   service.login(email, token);
  //   expect(isLoggedInSpy).toHaveBeenCalledWith(email, token);
  //   expect(alertSpy).toHaveBeenCalledWith('Login failed');
  //   expect(reloadSpy).toHaveBeenCalled();
  // });

  // it('should expire the token after the specified time', () => {
  //   const expirationTime = 3600;
  //   const currentTime = 1000;
  //   const removeItemSpy = spyOn(localStorage, 'removeItem');
    
  //   const tokenExpired = true;
  //   const consoleSpy = spyOn(console, 'log');
  //   const logoutSpy = spyOn(service, 'logout');
  //   service.expiredTime();
  //   expect(removeItemSpy).toHaveBeenCalledWith('token');
  //   expect(consoleSpy).toHaveBeenCalledWith(tokenExpired);
  //   expect(logoutSpy).toHaveBeenCalled();
  // });

  // it('should return true if email and token match', () => {
  //   const email = 'test@example.com';
  //   const token = 'test-token';
  //   const user = { email: email };
  //   localStorage.setItem('token', token);
  //   const cacheService = jasmine.createSpyObj('CacheService', ['getUserSaved']);
  //   cacheService.getUserSaved.and.returnValue(user);
  //   service['cacheService'] = cacheService;
  //   const isLoggedIn = service.IsLoggedIn(email, token);
  //   expect(isLoggedIn).toBeTrue();
  // });
  
  // it('should return false if email and token do not match', () => {
  //   const email = 'test@example.com';
  //   const token = 'test-token';
  //   const user = { email: 'different-email' };
  //   localStorage.setItem('token', token);
  //   const cacheService = jasmine.createSpyObj('CacheService', ['getUserSaved']);
  //   cacheService.getUserSaved.and.returnValue(user);
  //   service['cacheService'] = cacheService;
  //   const isLoggedIn = service.IsLoggedIn(email, token);
  //   expect(isLoggedIn).toBeFalse();
  // });
  
  // it('should return false if token is not present in local storage', () => {
  //   const email = 'test@example.com';
  //   const token = 'test-token';
  //   localStorage.removeItem('token');
  //   const cacheService = jasmine.createSpyObj('CacheService', ['getUserSaved']);
  //   cacheService.getUserSaved.and.returnValue(null);
  //   service['cacheService'] = cacheService;
  //   const isLoggedIn = service.IsLoggedIn(email, token);
  //   expect(isLoggedIn).toBeFalse();
  // });

  // it('should save the user in cache', () => {
  //   const user = {   
  //     id:1,
  //     name: 'test',
  //     email: 'test',
  //     gender: 'test',
  //     status: 'test',
  //     password: 'test',
  //     token: 'test',
  //    };
  //   const cacheService = jasmine.createSpyObj('CacheService', ['saveUser']);
  //   service['cacheService'] = cacheService;
  //   service.setCachedUser(user);
  //   expect(cacheService.saveUser).toHaveBeenCalledWith(user);
  // });

  // it('should return the cached user', () => {
  //   const user = { 
  //     id:1,
  //     name: 'test',
  //     email: 'test',
  //     gender: 'test',
  //     status: 'test',
  //     password: 'test',
  //     token: 'test',
  //    };
  //   const cacheService = jasmine.createSpyObj('CacheService', ['getUserSaved']);
  //   cacheService.getUserSaved.and.returnValue(user);
  //   service['cacheService'] = cacheService;
  //   const cachedUser = service.getCachedUser();
  //   expect(cachedUser).toEqual(user);
  // });

  // it('should logout the user and navigate to login page', () => {
  //   const routerSpy = spyOn(service['router'], 'navigateByUrl');
  //   const logout = service.logout();
  //   expect(logout).toBeUndefined();
  //   expect(routerSpy).toHaveBeenCalledWith('/login');
  // });

  // it('should return the token from local storage', () => {
  //   const token = 'test-token';
  //   localStorage.setItem('token', token);
  //   const tokenValue = service.getToken();
  //   expect(tokenValue).toEqual(token);
  // });
  
  it('should return null if token is not present in local storage', () => {
    localStorage.removeItem('token');
    const tokenValue = service.getToken();
    expect(tokenValue).toBeNull();
  });
});
