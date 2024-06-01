import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidLoginComponent } from './invalid-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('InvalidLoginComponent', () => {
  let component: InvalidLoginComponent;
  let fixture: ComponentFixture<InvalidLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidLoginComponent, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: []
           }, 
          { 
          provide: MAT_DIALOG_DATA, 
          useValue: [] 
          }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
