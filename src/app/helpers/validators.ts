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
}
