import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidationService {
  constructor() {}

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const uppercaseRegex = new RegExp('^(?=.*?[A-Z])');
      const lowercaseRegex = new RegExp('^(?=.*?[a-z])');
      const numRegex = new RegExp('^(?=.*?[0-9])');
      const validNum = numRegex.test(control.value);
      const validUppercase = uppercaseRegex.test(control.value);
      const validLowercase = lowercaseRegex.test(control.value);
      return !validNum
        ? { validNum: true }
        : !validUppercase
        ? { validUppercase: true }
        : !validLowercase
        ? { validLowercase: true }
        : (null as any);
    };
  }
}

export function confirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: UntypedFormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
