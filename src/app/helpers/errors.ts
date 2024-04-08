import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export class Errors {
  public static handleFormError(formGroup: FormGroup, reason: HttpErrorResponse) {
    const errorKeys = Object.keys(reason.error as { [key: string]: string });
    errorKeys.forEach(key => {
      const message = reason.error[key][0];
      formGroup.get(key)?.setErrors({ server: { message: message } });
    });
  }
}
