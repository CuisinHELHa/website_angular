import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDTO} from '@app/DTOs/user-dto';
import {RecipeDTO, RecipeList} from '@app/DTOs/recipe-dto';
import {ReviewDTO, ReviewList} from '@app/DTOs/review-dto';
import {RecipeService} from '@app/services/recipe.service';
import {ReviewService} from '@app/services/review.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/services/user.service';
import {AuthenticationService} from '@app/services/authentication.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: UserDTO;
  public mailForm: FormGroup = this.fb.group({
    newMail: this.fb.control('', Validators.required)
  });

  public pwdForm: FormGroup = this.fb.group({
    newPassword: this.fb.control('', Validators.required),
    oldPassword: this.fb.control('', Validators.required)
  });
  private subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService,
              private reviewService: ReviewService,
              private userService: UserService,
              private _authService: AuthenticationService,
              private fb: FormBuilder) {
  }

  private _recipes: RecipeList;

  get recipes(): RecipeDTO[] {
    return this._recipes;
  }

  set recipes(value: RecipeDTO[]) {
    this._recipes = value;
  }

  private _reviews: ReviewList;

  get reviews(): ReviewDTO[] {
    return this._reviews;
  }

  set reviews(value: ReviewDTO[]) {
    this._reviews = value;
  }

  private _changingMail: boolean;

  get changingMail(): boolean {
    return this._changingMail;
  }

  set changingMail(value: boolean) {
    this._changingMail = value;
  }

  private _changingPassword: boolean;

  get changingPassword(): boolean {
    return this._changingPassword;
  }

  set changingPassword(value: boolean) {
    this._changingPassword = value;
  }

  private _passwordError: boolean;

  get passwordError(): boolean {
    return this._passwordError;
  }

  set passwordError(value: boolean) {
    this._passwordError = value;
  }

  private _passwordSuccess: boolean;

  get passwordSuccess(): boolean {
    return this._passwordSuccess;
  }

  set passwordSuccess(value: boolean) {
    this._passwordSuccess = value;
  }

  ngOnInit() {
    this.user = this._authService.currentUserValue;
    this.loadRecipe();
    this.loadReview();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  loadRecipe() {
    const sub = this.recipeService
      .queryUser(this.user.idUser)
      .subscribe(recipes => this.recipes = recipes);
    this.subscriptions.push(sub);
  }

  loadReview() {
    const sub = this.reviewService
      .queryUser(this.user.idUser)
      .subscribe(reviews => this.reviews = reviews);
    this.subscriptions.push(sub);
  }

  updateMail() {
    const sub = this.userService
      .putMail({
        userID: this.user.idUser,
        mail: this.mailForm.get('newMail').value
      })
      .subscribe(answer => {
        console.log(answer);
        this.user.mail = this.mailForm.get('newMail').value;
        localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(this.user));
        this.mailForm.reset();
        this.changingMail = false;
      });
    this.subscriptions.push(sub);
  }

  updatePassword() {
    const sub = this.userService
      .putPassword({
        userID: this.user.idUser,
        passwordNew: this.pwdForm.get('newPassword').value,
        passwordOld: this.pwdForm.get('oldPassword').value
      })
      .subscribe(result => {
          this.passwordSuccess = true;
          this.changingPassword = false;
          this.pwdForm.reset();
        },
        error => {
          this.passwordError = true;
        });
    this.subscriptions.push(sub);
  }
}
