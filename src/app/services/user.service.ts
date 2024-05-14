import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { User } from '../interfaces/user.model';
import { UserDetail } from '../interfaces/user-detail';
import { Posts } from '../interfaces/user-post';
import { Comments } from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://gorest.co.in/public/v2';
  userDetail!: UserDetail;
  userPost!: Array<Posts>;
  comments!: Array<Comments>;
  comment!: Comments;
  itemsPerPage = 20;
  page: number =  1;


  token = this.authService.getToken();

  constructor(private authService: AuthService, private httpService: HttpClient) { }


  //METODI GET


  getUsers(): Observable<Array<User>>{
    return this.httpService.get<Array<User>>(`${this.url}/users?page=1&per_page=50`)
  }

  getUserDetail(id: number): Observable<UserDetail>{
    const url = `${this.url}/users/${id}`;
    return this.httpService.get<UserDetail>(url, {headers: this.getHeaders()});
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


  getAllPosts(): Observable<Posts[]>{
    const url = `${this.url}/posts?page=1&per_page=50`;
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


  getTotPosts(page: number): Observable<Array<Posts>>{
    const url = `${this.url}/posts?page=1&per_page=20`;
    return this.httpService.get<Array<Posts>>(url + '?page=' + page, {headers: this.getHeaders()}).pipe(
        shareReplay(1)
    );
  }


  // getTotPosts(page: number = 1, itemsPerPage: number = 20): Observable<Array<Posts>>{
  //   const url = `${this.url}/posts`;
  //   return  this.httpService.get<Array<Posts>>(url, {headers: this.getHeaders()})
  //   .pipe(
  //       map((items: Array<Posts>)=> items.slice((page -1) * itemsPerPage, page * itemsPerPage)
  //       )
  //   );
  // }




  //METODI POST

  createUser(user: User): Observable<User> {
    const url = `${this.url}/users`;
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.httpService.post<User>(url, user, { headers: header});
  }

  createUserPost(id: number, post: Posts): Observable<Posts> {
    const url = `${this.url}/users/${id}/posts`;
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    let postBody ={
      user_id: post.user_id,
      title: post.title,
      body: post.body,
    }
    return this.httpService.post<Posts>(url, postBody, {headers: header});
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
    const header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return header;
  }


}

