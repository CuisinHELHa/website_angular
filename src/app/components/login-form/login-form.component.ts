import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/services/authentication.service";
import {first, map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDTO, UserList} from "@app/DTOs/user-dto";

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
  private _isSigningUp: boolean;
  private _submitted: boolean;
  private _loading: boolean;
  private _returnURL: string;
  private _error: string = "";

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

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private http:HttpClient) {
  }

  testIntegrity() {
    var test = `${environment.apiUrl}/api/users/integrity`;
    // var test = `https://localhost:5001/api/users/integrity`;
    console.log(test);
    console.log(this.http.get<UserDTO>(test));
    return this.http.get<UserDTO>(test).pipe(map(user =>{
      console.log(user);
      return user;
    }));
  }


  /**
   * Use the login form at first and sets the return URL.
   */
  ngOnInit() {
    // First use the login form
    this.useLoginForm();

    // get return url from route parameters or default to '/'
    this._returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * On form submit, tries to log or connect the user.
   */
  onSubmit() {
    this.submitted = true;

    if (this._form.invalid) {
      return;
    }

    this._loading = true;
    if (!this._isSigningUp) {
      this.authService.login(this.fgCtrls.login.value, this.fgCtrls.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this._returnURL]);
          },
          error => {
            this._error = error;
            this.loading = false;
          }
        );
    } else {
      console.log("NOT IMPLEMENTED YET");
    }

  }

  /**
   * Returns the form controls.
   */
  get fgCtrls() {
    return this.form.controls;
  }

  /********************************************************
   ********************* FORM GROUP ************************
   *********************************************************/
  /**
   * Buils "form" as the login form.
   */
  buildLoginFG(): void {
    this._form = this.fb.group({
      login: this._loginCtrl,
      password: this._passwordCtrl,
    });

    // Auto filling if in dev.
    if(!environment.production){
      this.fgCtrls.login.setValue("ElsaD");
      this.fgCtrls.password.setValue("adminElsa");
    }
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

    // Random filling if in dev.
    if(!environment.production){
      let rand = Math.floor(Math.random()*1000000);
      this.fgCtrls.login.setValue("test" + rand);
      this.fgCtrls.password.setValue("password");
      this.fgCtrls.passwordConfirm.setValue("password");
      this.fgCtrls.firstName.setValue("first");
      this.fgCtrls.lastName.setValue("last");
      this.fgCtrls.email.setValue("test" + rand + "@gmail.com");
      this.onSubmit();
    }
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


  get isSigningUp(): boolean {
    return this._isSigningUp;
  }

  set isSigningUp(value: boolean) {
    this._isSigningUp = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

}
