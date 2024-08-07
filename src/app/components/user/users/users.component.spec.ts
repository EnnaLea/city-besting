import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [UsersComponent, HttpClientTestingModule, BrowserAnimationsModule]
  //   })
  //   .compileComponents();
    
  //   fixture = TestBed.createComponent(UsersComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(async() => {
        await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule]
    })
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
