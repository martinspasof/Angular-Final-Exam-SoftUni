import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
    passwordControlName: string,
    rePasswordControlName: string
): ValidatorFn {
    return (control) => {
        const passwordFormControlName = control.get(passwordControlName);
        const rePasswordFormControlName = control.get(rePasswordControlName);

        const passwordsAreMatching = 
        passwordFormControlName?.value === rePasswordFormControlName?.value;
        return passwordsAreMatching ? null : {matchPasswordsValidator: true};
    }
}