import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsComponent } from './users-details.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule, provideRouter } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { provideHttpClient } from '@angular/common/http';

describe('UsersDetailsComponent', () => {
  let component: UsersDetailsComponent;
  let fixture: ComponentFixture<UsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailsComponent, HttpClientTestingModule],
      providers: [UserService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
      ],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
