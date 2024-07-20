import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { User } from '../interfaces/user.model';
import { UserDetail } from '../interfaces/user-detail';
import { Posts } from '../interfaces/user-post';
import { Comments } from '../interfaces/comments';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://gorest.co.in/public/v2';
  userDetail!: UserDetail;
  userPost!: Array<Posts>;
  comments!: Array<Comments>;
  comment!: Comments;

  posts$!: Observable<any>;
  pageSizeOptions: number[] = [5, 10, 20, 30, 50]; // Define your page size options
  pageSize: number = 10; // Default page size
  currentPage: number = 1;
  totalPosts: number = 0;

//usare variabile d'ambiente
  //token = "2e3699e7eeac0f7d388cf4810572e3743985e04b791bf44b71dc98ee264739e1";

  constructor(private authService: AuthService, private httpService: HttpClient, private cacheService: CacheService) { }



getTokenRegistered(){
  let token = localStorage.getItem('token');
  if(token != null){
    return token;
  }
  return null;
}
  //METODI GET


  // getUsers(): Observable<Array<User>>{
  //   return this.httpService.get<Array<User>>(`${this.url}/users?page=1&per_page=50`)
  // }

  getUsers(page: number, limit: number): Observable<User[]> {
    const url = `${this.url}/users?page=${page}&per_page=${limit}`;
    return this.httpService.get<User[]>(url, {headers: this.getHeaders()});
  }

  getUserDetail(id: number): Observable<UserDetail>{
    const url = `${this.url}/users/${id}`;
    return this.httpService.get<UserDetail>(url, {headers:this.getHeaders()});
  }

  getUserPosts(id: number): Observable<Array<Posts>>{
    const url = `${this.url}/users/${id}/posts?page=1&per_page=20`;
    return this.httpService.get<Array<Posts>> (url, {headers: this.getHeaders()}).pipe(
      shareReplay(1)
  );
}

  getPostComments(post_id: number): Observable<Array<Comments>>{
    const url = `${this.url}/posts/${post_id}/comments?page=1&per_page=50`;
    return this.httpService.get<Array<Comments>>(url, {headers: this.getHeaders()}).pipe(
      shareReplay(1)
  );
  }


  // getAllPosts(): Observable<Posts[]>{
  //   const url = `${this.url}/posts?page=1&per_page=50`;
  //   return this.httpService.get<Posts[]>(url, {headers: this.getHeaders()})
  // }
  getAllPosts(): Observable<Posts[]>{
    const url = `${this.url}/posts`;
    return this.httpService.get<Posts[]>(url, {headers: this.getHeaders()})
  }

  // getAllPosts(): Observable<Posts[]>{
  //   return this.httpService.get<Posts[]>(`${this.url}/posts?page=1&per_page=20`);
  // }

  // getAllPosts(): Observable<Array<Posts>>{
  //   const url = `${this.url}/posts?page=${1}&size=${this.itemsPerPage}`;
  //   return this.httpService.get<Array<Posts>>(url, {headers: this.getHeaders()});
  // }

  // getTotPosts(page: number): Observable<Array<Posts>>{
  //   const url = `${this.url}/posts?page=${page}&size=${this.itemsPerPage}`;
  //   return this.httpService.get<Array<Posts>>(url, {headers: this.getHeaders()});
  // }


  // getTotPosts(): Observable<Array<Posts>>{
  //   const url = `${this.url}/posts?page=${this.currentPage}&per_page=${this.itemsPerPage}`;
  //   return this.httpService.get<Array<Posts>>(url, {headers: this.getHeaders()}).pipe(
  //       shareReplay(1)
  //   );
  // }


  // change this code to take in parameter for the pagination in mat-paginator. the parameter is pageSize
  // getTotPosts(page: number, itemsPerPage: number): Observable<Array<Posts>>{
  //   const url = `${this.url}/posts`;
  //   return  this.httpService.get<Array<Posts>>(url, {headers: this.getHeaders()})
  //   .pipe(
  //       map((items: Array<Posts>)=> items.slice((page -1) * itemsPerPage, page * itemsPerPage)
  //       )
  //   );
  // }

  // getTotPosts(page: number, pageSize: number): Observable<Posts[]> {
  //   const url = `${this.url}/posts?page=${page}&per_page=${pageSize}`;
  //   const headers = this.getHeaders();

  //   return this.httpService.get<Posts[]>(url, { headers }).pipe(
  //     map((items: Posts[]) => {
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = Math.min(startIndex + pageSize, items.length);
  //       return items.slice(startIndex, endIndex);
  //     })
  //   );

  // }

  getPosts(page: number, limit: number): Observable<Posts[]> {
    const url = `${this.url}/posts?page=${page}&per_page=${limit}`;
    return this.httpService.get<Posts[]>(url, {headers : this.getHeaders()})
  }


  // getTotalPosts(): Observable<number> {
  //   const url = `https://gorest.co.in/public-api/posts?total=3000`;
  //   return this.httpService.get<any>(url, { headers: this.getHeaders() }).pipe(
  //     map(response => response.length)
  //   );
  // }
  // getPosts(page: number, limit: number, total:number): Observable<Posts[]> {
  //   const url = `${this.url}/posts?page=${page}&per_page=${limit}&total=${total}`;
  //   return this.httpService.get<Posts[]>(url, {headers : this.getHeaders()})
  // }




  //METODI POST

  registerUser(user: User): Observable<User> {
    const url = `https://gorest.co.in/public/v2/users`;
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getTokenRegistered()}`
    );
        let userBody ={
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status,
    token: user.token
    }
    console.log(userBody);
    return this.httpService.post<User>(url, userBody, { headers: header});
  }
  createNewUser(user: User): Observable<User> {
    const url = `https://gorest.co.in/public/v2/users`;
        let userBody ={
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status,
    token: user.token
    }
    console.log(userBody);
    return this.httpService.post<User>(url, userBody, { headers: this.getHeaders()});
  }

  createUserPost(id: number, post: Posts): Observable<Posts> {
    const url = `${this.url}/users/${id}/posts`;
    let postBody ={
      user_id: post.user_id,
      title: post.title,
      body: post.body,
    }
    return this.httpService.post<Posts>(url, postBody, {headers: this.getHeaders()});
  }

  createUserComment(postId: number, comment: Comments): Observable<Comments> {
    const url = `${this.url}/posts/${postId}/comments`;
    
    let commentBody = {
      postId: postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    }
    return this.httpService.post<Comments>(url, commentBody, {headers: this.getHeaders()});
  }


  //METHOD PATCH
  updateUser(id: number, body: object): Observable<User>{
    // const id = this.user.id;
    const url = `${this.url}/users/${id}`;
    return this.httpService.patch<User>(url, body, {headers: this.getHeaders()});
  }

  //METHOD DELETE
  deleteUser(id: number): Observable<User>{
    const url = `${this.url}/users/${id}`;
    return this.httpService.delete<User>(url, {headers: this.getHeaders()});
  }

  
  getHeaders(){
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.cacheService.getToken()}`
    );
    return header;
  }


}

