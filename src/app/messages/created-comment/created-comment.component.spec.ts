import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCommentComponent } from './created-comment.component';

describe('CreatedCommentComponent', () => {
  let component: CreatedCommentComponent;
  let fixture: ComponentFixture<CreatedCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedCommentComponent]
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
