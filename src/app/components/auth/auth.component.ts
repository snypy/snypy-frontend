import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthCredentials, AuthResource, RegisterPayload } from '../../services/resources/auth.resource';
import { PasswordResetPayload, PasswordResetResource } from '../../services/resources/passwordreset.resource';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public STATE_LOGIN = 'LOGIN';
  public STATE_REGISTER = 'REGISTER';
  public STATE_REGISTER_COMPLETE = 'REGISTER_COMPLETE';
  public STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';
  public STATE_PASSWORD_FORGOT_COMPLETE = 'PASSWORD_FORGOT_COMPLETE';

  public ACTIVE_STATE: string = null;

  @Output() public login = new EventEmitter<AuthCredentials>();

  public server_errors = null;

  public constructor(private readonly authResource: AuthResource, private readonly passwordResetResource: PasswordResetResource) {}

  public ngOnInit(): void {
    this.ACTIVE_STATE = this.STATE_LOGIN;
  }

  public doLogin(authCredentials: AuthCredentials): void {
    this.authResource.login(authCredentials);
  }

  public doRegister(registerPayload: RegisterPayload): void {
    this.authResource
      .register({}, registerPayload)
      .$promise.then(() => {
        console.log('User registered');
        this.setActiveState(this.STATE_REGISTER_COMPLETE);
      })
      .catch(reason => {
        console.log('Cannot register user');
        console.log(reason);
        this.server_errors = reason.error;
      });
  }

  public doPasswordReset(passwordResetPayload: PasswordResetPayload): void {
    this.passwordResetResource
      .save({}, passwordResetPayload)
      .$promise.then(() => {
        console.log('Password reset requested');
        this.setActiveState(this.STATE_PASSWORD_FORGOT_COMPLETE);
      })
      .catch(reason => {
        console.log('Cannot reset password');
        console.log(reason);
        this.server_errors = reason.error;
      });
  }

  public setActiveState(newState: string): void {
    this.ACTIVE_STATE = newState;
  }
}
