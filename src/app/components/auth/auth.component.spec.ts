import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AuthResource } from '../../services/resources/auth.resource';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientModule, NgxsModule.forRoot(), ToastrModule.forRoot({})],
      providers: [AuthResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have login as active state on init', async () => {
    expect(await firstValueFrom(component.activeState$)).toBe('LOGIN');
  });

  it('should change the state', async () => {
    component.setActiveState(component.STATE_REGISTER);
    expect(await firstValueFrom(component.activeState$)).toBe('REGISTER');
  });

  it('should call doLogin()', () => {
    const spy = spyOn(component, 'doLogin');
    component.doLogin({ username: 'username', password: 'password' });
    expect(spy).toHaveBeenCalled();
  });

  it('should call doRegister()', () => {
    const spy = spyOn(component, 'doRegister');
    component.doRegister({ email: '', first_name: '', last_name: '', password: '', password_confirm: '', username: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('should call doPasswordReset()', () => {
    const spy = spyOn(component, 'doPasswordReset');
    component.doPasswordReset({ email: 'email', formGroup: new FormGroup({}) });
    expect(spy).toHaveBeenCalled();
  });
});
