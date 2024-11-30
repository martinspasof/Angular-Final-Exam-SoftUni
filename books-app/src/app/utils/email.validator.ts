import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {

    const dominStr = domains.join('|');
    const regExp = new RegExp(`[A-Za-z.0-9]{6}@gmail.(${dominStr})`);
    
    return (control) => {
        // isValid??
        const isInValid = control.value === '' || regExp.test(control.value);
        
        return isInValid ? null : {emailValidator: true};
    };
    
}