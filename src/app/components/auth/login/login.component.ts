import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Validators } from '../../../helpers/validators';
import { AuthTokenLoginCreateRequestParams } from '@snypy/rest-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<AuthTokenLoginCreateRequestParams>();

  form: UntypedFormGroup;

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl(null, Validators.required, null),
      password: new UntypedFormControl(null, Validators.required, null),
    });
  }

  doLogin(): void {
    this.login.emit(this.form.value);
  }
}
