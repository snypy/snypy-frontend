import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthCredentials } from '../../../services/resources/auth.resource';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<AuthCredentials>();

  authForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required, null),
      password: new FormControl(null, Validators.required, null),
    });
  }

  doLogin() {
    this.login.emit(this.authForm.value);
  }

}
