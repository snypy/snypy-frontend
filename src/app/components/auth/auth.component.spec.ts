import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { AuthResource } from '../../services/resources/auth.resource';
import { PasswordResetResource } from '../../services/resources/passwordreset.resource';
import { UserResource } from '../../services/resources/user.resource';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [NgxResourceFactoryModule.forRoot(), HttpClientModule, NgxsModule.forRoot()],
      providers: [AuthResource, UserResource, PasswordResetResource],
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

  it('should have login as active state on init', () => {
    expect(component.ACTIVE_STATE).toBe('LOGIN');
  });

  it('should change the state', () => {
    component.setActiveState(component.STATE_REGISTER);
    expect(component.ACTIVE_STATE).toBe('REGISTER');
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
    component.doPasswordReset({ email: 'email' });
    expect(spy).toHaveBeenCalled();
  });
});
