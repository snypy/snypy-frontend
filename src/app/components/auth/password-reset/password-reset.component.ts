import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthCredentials} from "../../../services/resources/auth.resource";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  @Output() passwordReset = new EventEmitter<AuthCredentials>();

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], null),
    });
  }

  doPasswordReset(): void {
    this.passwordReset.emit(this.form.value);
  }

}
