import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '../../../helpers/validators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent implements OnInit {
  @Output() public passwordReset = new EventEmitter<{ email: string; formGroup: FormGroup }>();

  public form: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], null),
    });
  }

  public doPasswordReset(): void {
    this.passwordReset.emit({ email: this.form.get('email').value, formGroup: this.form });
  }
}
