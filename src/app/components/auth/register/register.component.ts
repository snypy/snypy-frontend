import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '../../../helpers/validators';
import { RegisterPayload } from '../../../services/resources/auth.resource';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnChanges {
  @Output() register = new EventEmitter<RegisterPayload>();
  @Input() errors = null;

  form: FormGroup;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required, null),
      first_name: new FormControl(null, Validators.required, null),
      last_name: new FormControl(null, Validators.required, null),
      email: new FormControl(null, [Validators.required, Validators.email], null),
      password: new FormControl(null, Validators.required, null),
      password_confirm: new FormControl(null, Validators.required, null),
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

  doRegister(): void {
    this.register.emit(this.form.value);
  }
}
