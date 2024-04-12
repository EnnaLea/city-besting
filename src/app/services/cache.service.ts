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

   /* This code snippet defines a method deleteSavedUser that removes a user object from the local storage with the key 'user'. */
  deleteSavedUser(user: User){
    localStorage.removeItem('user');
  }


  // cacheNewUser(label:string, value:{}) {
  //   localStorage.removeItem(label);
  //   let jsonValue = JSON.stringify(value);
  //   localStorage.setItem(label, jsonValue);
  // }

  //method to check if a user have already done the registration using the method cacheNewUser()



//   public checkAuth() {
//     let user:User | undefined;
//     let auth:Auth | undefined;

//     let item =  localStorage.getItem('user') ? localStorage.getItem('user') : undefined;

//     if(item) {
//       user = (JSON.parse(item) as User);
//       if(user.id) {
//         this.subscribed = true;
//         item =  localStorage.getItem('auth') ? localStorage.getItem('auth') : undefined;
//         if(item) {
//           auth = (JSON.parse(item) as Auth);
//           if(auth) {
//             if(new Date().getTime() < auth.dateMillis) {
//                 this.logged = true;
//                 this.loggedUser = user;
//                 this.setStatus(); //To set the user status to 'active'
//             } else {
//               this.logOut();
//             }
//           } else {
//             this.logOut();
//           }
//         } else {
//           this.logged = false;
//           this.loggedUser = undefined;
//         }
//       } else {
//         this.unsubscribe();
//       }
//     } else {
//       this.subscribed = false;
//       this.logged = false;
//       this.loggedUser = undefined;
//     }
// }

//   public store(label:string, value:{}) {
//     localStorage.removeItem(label);
//     let jsonValue = JSON.stringify(value);
//     localStorage.setItem(label, jsonValue);
//     this.checkAuth();

//     if(localStorage.getItem(label))
//       return true;

//     return false;
//   }


}
