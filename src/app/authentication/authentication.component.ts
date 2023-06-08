import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserLogin } from '../shared/interface';
import { AuthService } from './service/auth.service';
import { GetSetAuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup = {} as FormGroup
  errorMessage: string = '';

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private _authservice: AuthService,
    private _setauth: GetSetAuthService,
    private _router: Router
  ) { }


  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, AuthenticationComponent.passwordValidator]]
    })
  }

  static passwordValidator(control: AbstractControl) {
    // {6,100}           - Kata sandi antara 6 dan 100 karakter
    // (?=.*[0-9])       - Memiliki setidaknya satu angka
    // (?!.*\s)          - Spasi tidak diperbolehkan
    // tslint:disable-next-line
    if (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static getValidatorErrorMessage(code: string) {
    const config: any = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
    };
    return config[code];
  }

  async submit({ value, valid }: { value: IUserLogin, valid: boolean }) {
    console.log(value);
    let data = await this._authservice.login(value)
    console.log('response', data);
    if (data.success) {
      this._setauth.setLoginSucces(data)
      this._router.navigate(['/home']);
    } else {
      alert('login gagal, username atau password tidak cocok')
    }

  }

}
