import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Validators {
  public static required(control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return {
        message: 'This field is required',
      };
    }
    return null;
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
      return null;
    }
    return {
      message: 'Please provide a valid email address',
    };
  }

  public static matchPassword = (fieldA: string, fieldB: string) => {
    return (AC: AbstractControl) => {
      const passwordField = AC.get(fieldA);
      const passwordConfirmationField = AC.get(fieldB);
      if (!passwordField || !passwordConfirmationField) {
        return null;
      }

      let password = passwordField.value;
      let passwordConfirmation = passwordConfirmationField.value;
      if (password && passwordConfirmation) {
        password = password.trim();
        passwordConfirmation = passwordConfirmation.trim();
        if (password !== passwordConfirmation || !passwordConfirmation.length || !password.length) {
          passwordConfirmationField.setErrors({ message: 'Passwords do not match!' });
          return {
            message: 'Passwords do not match!',
          };
        }
      }
      return null;
    };
  };
}
