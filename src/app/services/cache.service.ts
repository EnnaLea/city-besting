import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {



  constructor() { }

  /* This code snippet defines a method saveUser that stores a user object in local storage. The user object is first converted to a JSON string using JSON.stringify and then placed in local storage under the key 'user'. */
  saveUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

   /* This code snippet defines a method getUserSaved in the CacheService class. It retrieves a user object from local storage by the key 'user'. If the user object exists in local storage, it parses the object from JSON format and returns it; otherwise, it returns null. */
  getUserSaved(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    }
    return null;
  }

    getToken() {
      let token = localStorage.getItem('token');
      if(token != null){
        return JSON.parse(token);
      }
      return null;
  }

   /* This code snippet defines a method deleteSavedUser that removes a user object from the local storage with the key 'user'. */
  deleteSavedUser(){
    localStorage.removeItem('user');
  }


}
