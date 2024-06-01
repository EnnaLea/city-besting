import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleComponent } from './example.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [UserService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
