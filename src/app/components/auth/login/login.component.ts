import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthCredentials } from '../../../services/resources/auth.resource';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<AuthCredentials>();

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required, null),
      password: new FormControl(null, Validators.required, null),
    });
  }

  doLogin(): void {
    this.login.emit(this.form.value);
  }
}
