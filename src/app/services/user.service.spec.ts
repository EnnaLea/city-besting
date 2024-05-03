import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../auth/login/login.component';
import { MaterialModule } from '../module/material/material.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should get all the users', ()=>{
  //   let users = service.getUsers();
  //   expect(users).toBeDefined;
  // })

});
