import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthCredentials, AuthResource, RegisterPayload } from '../../services/resources/auth.resource';
import { PasswordResetPayload, PasswordResetResource } from '../../services/resources/passwordreset.resource';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  STATE_LOGIN = 'LOGIN';
  STATE_REGISTER = 'REGISTER';
  STATE_REGISTER_COMPLETE = 'REGISTER_COMPLETE';
  STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';
  STATE_PASSWORD_FORGOT_COMPLETE = 'PASSWORD_FORGOT_COMPLETE';

  ACTIVE_STATE: string = null;

  @Output() login = new EventEmitter<AuthCredentials>();

  server_errors = null;

  constructor(private authResource: AuthResource, private passwordResetResource: PasswordResetResource) {}

  ngOnInit(): void {
    this.ACTIVE_STATE = this.STATE_LOGIN;
  }

  doLogin(authCredentials: AuthCredentials): void {
    this.authResource.login(authCredentials);
  }

  doRegister(registerPayload: RegisterPayload): void {
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

  doPasswordReset(passwordResetPayload: PasswordResetPayload): void {
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

  setActiveState(newState: string): void {
    this.ACTIVE_STATE = newState;
  }
}
