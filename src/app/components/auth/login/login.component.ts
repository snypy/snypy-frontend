import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthCredentials } from '../../../services/resources/auth.resource';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<AuthCredentials>();

  authForm: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required, null),
      password: new FormControl(null, Validators.required, null),
    });
  }

  doLogin(): void {
    this.login.emit(this.authForm.value);
  }
}
