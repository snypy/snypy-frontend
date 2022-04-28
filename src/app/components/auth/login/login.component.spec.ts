import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBe(false);
  });

  it('form should be valid', () => {
    component.form.controls['username'].setValue('test');
    component.form.controls['password'].setValue('test');
    expect(component.form.valid).toBe(true);
  });

  it('should call doLogin()', () => {
    const spy = spyOn(component, 'doLogin');
    component.doLogin();
    expect(spy).toHaveBeenCalled();
  });
});
