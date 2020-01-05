import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthCredentials } from '../../services/resources/auth.resource';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  STATE_LOGIN = 'LOGIN';
  STATE_REGISTER = 'REGISTER';
  STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';

  ACTIVE_STATE: string = null;

  @Output() login = new EventEmitter<AuthCredentials>();
  @Output() register = new EventEmitter<{}>();

  ngOnInit() {
    this.ACTIVE_STATE = this.STATE_LOGIN;
  }

  doLogin(event: AuthCredentials) {
    this.login.emit(event);
  }

  doRegister(event: {}) {
    this.register.emit(event);
  }

  setActiveState(newState: string) {
    this.ACTIVE_STATE = newState;
  }

}
