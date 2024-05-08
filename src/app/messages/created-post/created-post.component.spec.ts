import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPostComponent } from './created-post.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CreatedPostComponent', () => {
  let component: CreatedPostComponent;
  let fixture: ComponentFixture<CreatedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedPostComponent],
      providers: [
        { 
          provide: MatDialogRef,
          useValue: []
           }, 
          { 
          provide: MAT_DIALOG_DATA, 
          useValue: [] 
          }
        // MatDialogRef
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
