import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '../../../helpers/validators';
import { PasswordResetPayload } from '../../../services/resources/passwordreset.resource';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit, OnChanges {
  @Output() passwordReset = new EventEmitter<PasswordResetPayload>();
  @Input() errors = null;

  form: FormGroup;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errors']) {
      const errors = changes['errors'].currentValue;

      if (errors) {
        mapFormErrors(this.form, errors);

        if (errors['non_field_errors']) {
          for (const error of errors['non_field_errors']) {
            this.toastr.error(error);
          }
        }
      }
    }
  }

  doPasswordReset(): void {
    this.passwordReset.emit(this.form.value);
  }
}
