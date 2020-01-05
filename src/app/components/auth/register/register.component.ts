import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthCredentials } from '../../../services/resources/auth.resource';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() register = new EventEmitter<AuthCredentials>();

  authForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.authForm = new FormGroup({
      username: new FormControl(null, Validators.required, null),
      first_name: new FormControl(null, Validators.required, null),
      last_name: new FormControl(null, Validators.required, null),
      email: new FormControl(null, [Validators.required, Validators.email], null),
      password: new FormControl(null, Validators.required, null),
      password_confirm: new FormControl(null, Validators.required, null),
    });
  }

  doRegister() {
    this.register.emit(this.authForm.value);
  }

}
