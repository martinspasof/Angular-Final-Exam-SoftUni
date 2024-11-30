import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(DOMAINS),
    ]),
    tel: new FormControl(''),
    passGroup: new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [matchPasswordsValidator('password', 'rePassword')],
    })

  });

  constructor(private userService: UserService, private router: Router){}

  isFieldTouched(controlName: string) {

    return this.form.get(controlName)?.touched;
  }

  isFieldRequired(controlName: string) {

    return this.form.get(controlName)?.errors?.['required'];    
  }

  get isNotFieldMinLength() {

    return this.form.get('username')?.errors?.['minlength'];    
  }

  get isEmailNotValidate() {

    return this.form.get('email')?.errors?.['emailValidator'];
  }

  get passGroup(){

    return this.form.get('passGroup');
  }

  get isFieldPasswordTouched() {

    return this.passGroup?.get('password')?.touched;    
  }

  get isNotMinPasswordLength() {

    return this.passGroup?.get('password')?.errors?.['minlength'];    
  }

  get isFieldPasswordRequired() {

    return  this.passGroup?.get('password')?.errors?.['required'];
  }

  get isFieldRePasswordTouched() {
    return this.passGroup?.get('rePassword')?.touched;
  }

  get isFieldRePasswordRequired() {

    return  this.passGroup?.get('rePassword')?.errors?.['required']; 
  }

  get isFieldRePasswordValidate() {

    return this.passGroup?.errors?.['matchPasswordsValidator'];    
  }

  register(){
    if(this.form.invalid){
      return;
    }

    const {
      username, 
      email, 
      tel, 
      passGroup: { password, rePassword} = {},
    } = this.form.value;

    this.userService.register(
      username!, 
      email!, 
      tel!, 
      password!, 
      rePassword!).subscribe(() => {
        this.router.navigate(['/books']);
      }); 
  }
}
