import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {

    const dominStr = domains.join('|');
    const regExp = new RegExp(`[A-Za-z.0-9]{6}@(gmail|abv|yahoo).(${dominStr})`);
    
    return (control) => {
        const isInValid = control.value === '' || regExp.test(control.value);
        
        return isInValid ? null : {emailValidator: true};
    };
    
}