import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { CacheService } from '../../../services/cache.service';
import { AuthService } from '../../../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AdminPostComponent } from '../admin-post/admin-post.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { UserService } from '../../../services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers:[CacheService, AuthService, 
        NewPostComponent, AdminPostComponent,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
      ]
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });    
  
  
  beforeEach((() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    component.user = {
        name: 'test',
        gender: 'test',
        email: 'test',
        status: 'test'
    };
    fixture.detectChanges();
}));


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
