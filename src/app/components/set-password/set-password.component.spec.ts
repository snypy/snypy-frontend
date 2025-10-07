import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { SetPasswordComponent } from './set-password.component';

describe('SetPasswordComponent', () => {
  let component: SetPasswordComponent;
  let fixture: ComponentFixture<SetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetPasswordComponent],
      imports: [RouterTestingModule, HttpClientModule, NoopAnimationsModule, ToastrModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.createForm();
    component.form.controls['password'].setValue('');
    component.form.controls['password_confirm'].setValue('');
    expect(component.form.valid).toBe(false);
  });

  it('form should be valid', () => {
    component.createForm();
    component.form.controls['password'].setValue('test');
    component.form.controls['password_confirm'].setValue('test');
    expect(component.form.valid).toBe(true);
  });

  it('should call doSetPassword()', () => {
    component.createForm();
    const spy = spyOn(component, 'doSetPassword');
    component.doSetPassword();
    expect(spy).toHaveBeenCalled();
  });
});
