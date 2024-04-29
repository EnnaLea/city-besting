import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPostComponent } from './created-post.component';

describe('CreatedPostComponent', () => {
  let component: CreatedPostComponent;
  let fixture: ComponentFixture<CreatedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedPostComponent]
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
