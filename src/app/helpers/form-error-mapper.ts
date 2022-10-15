import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

function mapFormControlErrors(formControl: FormControl, apiErrors: string[]) {
  if (apiErrors && apiErrors.length) {
    formControl.setErrors({ serverErrors: apiErrors });
  }
}

function mapFormGroupErrors(formGroup: FormGroup, apiErrors: any) {
  if (Object.keys(apiErrors).length) {
    Object.keys(formGroup.controls).forEach(controlName => {
      mapFormErrors(formGroup.get(controlName), apiErrors[controlName]);
    });
    formGroup.setErrors({ serverErrors: apiErrors });
  }
}

function mapFormArrayErrors(formArray: FormArray, apiErrors: any[]) {
  if (apiErrors) {
    formArray.controls.forEach((formControl, index) => {
      mapFormErrors(formControl, apiErrors[index]);
    });
    formArray.setErrors({ serverErrors: apiErrors });
  }
}

/**
 * Set errors received from a REST API call to a Form
 */
export function mapFormErrors(abstractControl: AbstractControl, apiErrors: any) {
  if (abstractControl instanceof FormGroup) {
    mapFormGroupErrors(abstractControl as FormGroup, apiErrors);
  } else if (abstractControl instanceof FormArray) {
    mapFormArrayErrors(abstractControl as FormArray, apiErrors);
  } else if (abstractControl instanceof FormControl) {
    mapFormControlErrors(abstractControl as FormControl, apiErrors);
  }
}
