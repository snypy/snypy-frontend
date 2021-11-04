import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterCompleteComponent } from './register-complete.component';

describe('RegisterCompleteComponent', () => {
  let component: RegisterCompleteComponent;
  let fixture: ComponentFixture<RegisterCompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCompleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
