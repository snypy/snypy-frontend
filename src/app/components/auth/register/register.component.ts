import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthCredentials } from '../../../services/resources/auth.resource';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {

  @Output() register = new EventEmitter<AuthCredentials>();
  @Input() errors = null;

  authForm: FormGroup;

  constructor(private toastr: ToastrService) { }

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errors']) {
      const errors = changes['errors'].currentValue;

      if (errors) {
        mapFormErrors(this.authForm, errors);

        if (errors['non_field_errors']) {
          for (let error of errors['non_field_errors']) {
            this.toastr.error(error);
          }
        }
      }
    }
  }

  doRegister() {
    this.register.emit(this.authForm.value);
  }

}
