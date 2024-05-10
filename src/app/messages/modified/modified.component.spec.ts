import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedComponent } from './modified.component';

describe('ModifiedComponent', () => {
  let component: ModifiedComponent;
  let fixture: ComponentFixture<ModifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiedComponent]
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
