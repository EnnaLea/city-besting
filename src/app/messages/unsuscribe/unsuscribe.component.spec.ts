import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeComponent } from './unsuscribe.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UnsuscribeComponent', () => {
  let component: UnsuscribeComponent;
  let fixture: ComponentFixture<UnsuscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuscribeComponent, HttpClientTestingModule],
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
    
    fixture = TestBed.createComponent(UnsuscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
