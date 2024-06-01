import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from '../auth/login/login.component';
import { MaterialModule } from '../module/material/material.module';
import { User } from '../interfaces/user.model';
import { Posts } from '../interfaces/user-post';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserService', () => {
  let service: UserService;
  let testingController: HttpTestingController;
  let user : User;
  let page: number;
  let limit: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [UserService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
      ]
    });
    service = TestBed.inject(UserService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the users', ()=>{
    service.getUsers(page, limit).subscribe(data => {
      expect(data).toBeTruthy();
    });
    const req = testingController.expectOne(`https://gorest.co.in/public/v2/users?page=${page}&per_page=${limit}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    testingController.verify();
  });

  it('should get user by his id', ()=>{
    service.getUserDetail(1).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users/1');
  expect(req.request.method).toEqual('GET');
  req.flush({});
  testingController.verify();
  });

  it('should get user post by his id', ()=>{
    service.getUserPosts(1).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users/1/posts?page=1&per_page=20');
  expect(req.request.method).toEqual('GET');
  req.flush({});
  testingController.verify();
  });

  it('should post comments by id post', ()=>{
    service.getPostComments(1).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/posts/1/comments?page=1&per_page=50');
  expect(req.request.method).toEqual('GET');
  req.flush({});
  testingController.verify();
  });

  it('should get all posts', ()=>{
    service.getAllPosts().subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/posts');
  expect(req.request.method).toEqual('GET');
  req.flush({});
  testingController.verify();
  });

  it('should create a new user', ()=>{
    service.createUser(user).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users');
  expect(req.request.method).toEqual('POST');
  req.flush({});
  testingController.verify();
  });


  it('should create a new post', ()=>{
    let postBody ={
      user_id: 1,
      title: 'test',
      body: 'testing',
    }
    service.createUserPost(1, postBody).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users/1/posts');
  expect(req.request.method).toEqual('POST');
  req.flush({});
  testingController.verify();
  });

  it('should create a new comment', ()=>{
    let commentBody ={
      postId: 1,
      name: 'pippo',
      email: 'pippo@gmail.com',
      body: 'testing comment',
    }
    service.createUserComment(1, commentBody).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/posts/1/comments');
  expect(req.request.method).toEqual('POST');
  req.flush({});
  testingController.verify();
  });

  it('should update user info', ()=>{
    service.updateUser(1, user).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users/1');
  expect(req.request.method).toEqual('PATCH');
  req.flush({});
  testingController.verify();
  });

  it('should delete a user', ()=>{
    service.deleteUser(1).subscribe(data => {
      expect(data).toBeTruthy();
  })
  const req = testingController.expectOne('https://gorest.co.in/public/v2/users/1');
  expect(req.request.method).toEqual('DELETE');
  req.flush({});
  testingController.verify();
  });

});
