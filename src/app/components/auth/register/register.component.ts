import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mapFormErrors } from '../../../helpers/form-error-mapper';
import { RegisterPayload } from '../../../services/resources/auth.resource';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RegisterComponent implements OnChanges {
  @Output() register = new EventEmitter<RegisterPayload>();
  @Input() errors = null;

  form: FormGroup = new FormGroup([]);
  model = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,
      },
    },
    {
      key: 'first_name',
      type: 'input',
      props: {
        label: 'First name',
        placeholder: 'Enter first name',
        required: true,
      },
    },
    {
      key: 'last_name',
      type: 'input',
      props: {
        label: 'Last name',
        placeholder: 'Enter last name',
        required: true,
      },
    },
    {
      key: 'email',
      type: 'input',
      props: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      },
    },
    {
      key: 'password_confirm',
      type: 'input',
      props: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Confirm password',
        required: true,
      },
    },
  ];

  constructor(private toastr: ToastrService) {}

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
