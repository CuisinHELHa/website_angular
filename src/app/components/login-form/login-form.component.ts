import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public readonly LOGIN_PATTERN: string = "^(?=.*[a-zA-Z]{1,})(?=.*[\\d]{0,})[a-zA-Z0-9]{3,50}$";
  public readonly PASSWORD_PATTERN: string = "^\\S*$";
  public readonly NAME_PATTERN: string = "^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$";

  private _form: FormGroup;
  /**
   * Required, minLength(3), maxLength(50), only letters (caps or not) and numbers pattern.
   */
  private readonly _loginCtrl: FormControl = this.fb.control('', [Validators.required,
    Validators.pattern(this.LOGIN_PATTERN)]);
  /**
   * Required, minLength(3), maxLength(50) and no spaces pattern.
   */
  private readonly _passwordCtrl: FormControl = this.fb.control('', [Validators.required, Validators.minLength(3),
    Validators.maxLength(50), Validators.pattern(this.PASSWORD_PATTERN)]);

  constructor(public fb: FormBuilder) {
  }

  private _isSigningUp: boolean;

  get isSigningUp(): boolean {
    return this._isSigningUp;
  }

  set isSigningUp(value: boolean) {
    this._isSigningUp = value;
  }

  /**
   * Use the login form at first.
   */
  ngOnInit() {
    // First use the login form
    this.useLoginForm();
  }

  authenticate() {

  }

  /********************************************************
   ********************* FORM GROUP ************************
   *********************************************************/
  buildLoginFG(): void {
    this._form = this.fb.group({
      login: this._loginCtrl,
      password: this._passwordCtrl,
    })
  }

  /**
   * Buils "form" as the sign up form.
   * Use the "passwordsMatching" method as a validator.
   */
  buildSignupFG(): void {
    this._form = this.fb.group({
        login: this._loginCtrl,
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this._passwordCtrl,
        passwordConfirm: this.fb.control('').setValidators(this._passwordCtrl.validator),
        firstName: this.fb.control('', [Validators.required, Validators.maxLength(50),
          Validators.pattern(this.NAME_PATTERN)]),
        lastName: this.fb.control('', [Validators.required, Validators.maxLength(50),
          Validators.pattern(this.NAME_PATTERN)]),
      },
      {validator: this.passwordsMatching}
    );
  }

  /**
   * Verify that "password" and "passwordConfirm" are matching for the given AbstractControl.
   * @param c
   */
  passwordsMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
      return {invalid: true};
    }
  }

  /**
   * Sets _isSigningUp as true and builds the sign up FormGroup
   */
  useSignUpForm() {
    this._isSigningUp = true;
    this.buildSignupFG();
  }

  /**
   * Sets _isSigningUp as false and builds the login FormGroup
   */
  useLoginForm() {
    this._isSigningUp = false;
    this.buildLoginFG();
  }

  /**
   * @return Form validators are matching?
   */
  isFormValid(): boolean {
    if (this._form == null)
      return false;

    return this._form.valid;
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }
}
