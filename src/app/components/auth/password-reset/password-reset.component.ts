import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent {
  @Output() public passwordReset = new EventEmitter<{ email: string; formGroup: FormGroup }>();
  @Input() errors: any;

  form: FormGroup = new FormGroup([]);
  model = { username: '', password: '' };
  fields: FormlyFieldConfig[] = [
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
  ];

  public doPasswordReset(): void {
    this.passwordReset.emit({ email: this.form.get('email').value, formGroup: this.form });
  }
}
