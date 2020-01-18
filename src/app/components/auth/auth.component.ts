import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthCredentials, AuthResource } from '../../services/resources/auth.resource';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  STATE_LOGIN = 'LOGIN';
  STATE_REGISTER = 'REGISTER';
  STATE_REGISTER_COMPLETE = 'REGISTER_COMPLETE';
  STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';

  ACTIVE_STATE: string = null;

  @Output() login = new EventEmitter<AuthCredentials>();
  @Output() register = new EventEmitter<{}>();

  server_errors = null;

  constructor(private authResource: AuthResource) {
  }

  ngOnInit() {
    this.ACTIVE_STATE = this.STATE_LOGIN;
  }

  doLogin(event: AuthCredentials) {
    this.authResource.login(event);
  }

  doRegister(event: {}) {
    this.authResource.register({}, event).$promise
      .then(() => {
        console.log("User registered");
        this.setActiveState(this.STATE_REGISTER_COMPLETE);
      })
      .catch((reason) => {
        console.log("Cannot register user");
        console.log(reason);
        this.server_errors = reason.error;
      });
  }

  setActiveState(newState: string) {
    this.ACTIVE_STATE = newState;
  }
}
