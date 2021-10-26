import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetCompleteComponent } from './password-reset-complete.component';

describe('PasswordResetCompleteComponent', () => {
  let component: PasswordResetCompleteComponent;
  let fixture: ComponentFixture<PasswordResetCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetCompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
