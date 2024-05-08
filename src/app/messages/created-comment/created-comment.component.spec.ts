import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCommentComponent } from './created-comment.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('CreatedCommentComponent', () => {
  let component: CreatedCommentComponent;
  let fixture: ComponentFixture<CreatedCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedCommentComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
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
    
    fixture = TestBed.createComponent(CreatedCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
