import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/services/authentication.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "@app/DTOs/user-dto";
import {CreateUserPipe} from "@app/pipes/create-user.pipe";
import {UserService} from "@app/services/user.service";
import {AccountModalComponent} from "@app/components/account-modal/account-modal.component";

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
  private _isLoading: boolean;
  private _returnURL: string;
  private userCreated: boolean;
  private _error: string;

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
              private http: HttpClient,
              private userService: UserService) {
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

    this._isLoading = true;

    // ON LOGIN
    if (!this._isSigningUp) {
      this.authService.login(this.fgCtrls.login.value, this.fgCtrls.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this._returnURL]);
            this.isLoading = false;
          },
          error => {
            this._error = error;
            this.isLoading = false;
          }
        );

      // ON SIGNUP
    } else {
      // Creates the user using the form
      var userCreated = this.createrUser();

      // Post the user to the API
      this.authService.signUp(userCreated)
        .pipe(first())
        .subscribe(
          data => {
            this.isLoading = false;
            this.userCreated = true;
          },
          error => {
            this._error = error;
            this.isLoading = false;
          },
          () => {
            if (userCreated) {
              this.authService.login(userCreated.pseudo, userCreated.password).subscribe();
              AccountModalComponent.hideModal();
            }
          }
        );
    }
  }

  /**
   * Creates an UserDTO using the form fields.
   */
  private createrUser(): UserDTO {
    return new CreateUserPipe().transform(
      this.fgCtrls.login.value,
      this.fgCtrls.password.value,
      this.fgCtrls.firstName.value,
      this.fgCtrls.lastName.value,
      this.fgCtrls.email.value,
    );
  }

  /********************************************************
   ********************* FORM GROUP ************************
   *********************************************************/
  /**
   * Buils "form" as the login form and set as not submitted.
   */
  buildLoginFG(): void {
    this._form = this.fb.group({
      login: this._loginCtrl,
      password: this._passwordCtrl,
    });

    // Auto filling if in dev.
    if (!environment.production) {
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
        passwordConfirm: this.fb.control('', [Validators.required, Validators.minLength(3),
          Validators.maxLength(50), Validators.pattern(this.PASSWORD_PATTERN)]),
        firstName: this.fb.control('', [Validators.required, Validators.maxLength(50),
          Validators.pattern(this.NAME_PATTERN)]),
        lastName: this.fb.control('', [Validators.required, Validators.maxLength(50),
          Validators.pattern(this.NAME_PATTERN)]),
      },
      {validator: this.passwordsMatching}
    );

    // Random filling if in dev.
    if (!environment.production) {
      let rand = Math.floor(Math.random() * 1000000);
      this.fgCtrls.login.setValue("test" + rand);
      // this.fgCtrls.login.setValue("ElsaD");
      this.fgCtrls.password.setValue("password");
      this.fgCtrls.passwordConfirm.setValue("password");
      this.fgCtrls.firstName.setValue("first");
      this.fgCtrls.lastName.setValue("last");
      this.fgCtrls.email.setValue("test" + rand + "@gmail.com");
      // this.fgCtrls.email.setValue("elsadraux@gmail.com");
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
   * Sets _isSigningUp as true, _submitted as false and builds the sign up FormGroup
   */
  useSignUpForm() {
    this._isSigningUp = true;
    this._submitted = false;
    this.buildSignupFG();
  }

  /**
   * Sets _isSigningUp as false, _submitted as false and builds the login FormGroup
   */
  useLoginForm() {
    this._isSigningUp = false;
    this._submitted = false;
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

  /**
   * Returns the form controls.
   */
  get fgCtrls() {
    return this.form.controls;
  }

  loginValid(): boolean {
    return this.fgCtrls.login.valid;
  }

  passwordValid(): boolean {
    return this.fgCtrls.password.valid;
  }

  passwordConfirmValid(): boolean {
    return this.fgCtrls.passwordConfirm.valid;
  }

  firstNameValid(): boolean {
    return this.fgCtrls.firstName.valid;
  }

  lastNameValid(): boolean {
    return this.fgCtrls.lastName.valid;
  }

  emailValid(): boolean {
    return this.fgCtrls.email.valid;
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

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  get error(): string {
    return this._error;
  }

  set error(value: string) {
    this._error = value;
  }
}
