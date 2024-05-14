import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedComponent } from './modified.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ModifiedComponent', () => {
  let component: ModifiedComponent;
  let fixture: ComponentFixture<ModifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiedComponent, HttpClientTestingModule],
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
    
    fixture = TestBed.createComponent(ModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
