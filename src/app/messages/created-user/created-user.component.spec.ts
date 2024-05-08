import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedUserComponent } from './created-user.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreatedUserComponent', () => {
  let component: CreatedUserComponent;
  let fixture: ComponentFixture<CreatedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedUserComponent, HttpClientTestingModule],
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
    
    fixture = TestBed.createComponent(CreatedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
