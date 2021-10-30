import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetResource } from '../../services/resources/passwordreset.resource';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit {
  STATE_INVALID_TOKEN = 'INVALID_TOKEN';
  STATE_SET_PASSWORD = 'SET_PASSWORD';
  STATE_SET_PASSWORD_COMPLETE = 'SET_PASSWORD_COMPLETE';

  ACTIVE_STATE: string = null;

  form: FormGroup;
  token: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private passwordResetResource: PasswordResetResource,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.passwordResetResource
        .validate_token({}, params)
        .$promise.then(() => {
          console.log('Reset token valid');
          this.token = params['token'];
          this.form = new FormGroup({
            password: new FormControl(null, Validators.required, null),
            password_confirm: new FormControl(null, Validators.required, null),
          });
          this.ACTIVE_STATE = this.STATE_SET_PASSWORD;
        })
        .catch(reason => {
          console.log('Reset token invalid');
          console.log(reason);
          this.ACTIVE_STATE = this.STATE_INVALID_TOKEN;
        });
    });
  }

  doSetPassword(): void {
    if (this.form.get('password').value != this.form.get('password_confirm').value) {
      this.form.get('password_confirm').setErrors({ mismatch: true });
    } else {
      this.passwordResetResource
        .confirm(
          {},
          {
            token: this.token,
            password: this.form.get('password').value,
          }
        )
        .$promise.then(() => {
          console.log('New password set');
          this.ACTIVE_STATE = this.STATE_SET_PASSWORD_COMPLETE;
        })
        .catch(reason => {
          console.log('Error n setting new password');
          console.log(reason);
          mapFormErrors(this.form, reason.error);

          if (reason.error['non_field_errors']) {
            for (const error of reason.error['non_field_errors']) {
              this.toastr.error(error);
            }
          }
        });
    }
  }
}
