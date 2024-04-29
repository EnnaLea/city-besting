import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuscribeComponent } from './unsuscribe.component';

describe('UnsuscribeComponent', () => {
  let component: UnsuscribeComponent;
  let fixture: ComponentFixture<UnsuscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsuscribeComponent]
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
