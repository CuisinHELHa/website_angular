import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeDTO} from '../../../DTOs/recipe-dto';
import {StepDTO, StepList} from '../../../DTOs/step-dto';
import {IngredientDTO, IngredientList} from '../../../DTOs/ingredient-dto';
import {IngredientService} from '../../../services/ingredient.service';
import {Subscription} from 'rxjs';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StepService} from '../../../services/step.service';
import {ReviewDTO, ReviewList} from '../../../DTOs/review-dto';
import {ReviewService} from '../../../services/review.service';
import {AuthenticationService} from '@app/services/authentication.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  type = false;
  private idParam: string;
  private idRecipe: number;

  constructor(private ingredientService: IngredientService,
              private stepService: StepService,
              private recipeService: RecipeService,
              private reviewService: ReviewService,
              public route: ActivatedRoute,
              public router: Router,
              private _authService: AuthenticationService) {
  }

  private _recipe: RecipeDTO;

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  set recipe(value: RecipeDTO) {
    this._recipe = value;
    this.updateSpice(value.spiceRate);
  }

  private _spices: number[];

  get spices(): number[] {
    return this._spices;
  }

  set spices(value: number[]) {
    this._spices = value;
  }

  private _ingredients: IngredientList;

  get ingredients(): IngredientDTO[] {
    return this._ingredients;
  }

  set ingredients(value: IngredientDTO[]) {
    this._ingredients = value;
  }

  private _steps: StepList;

  get steps(): StepDTO[] {
    return this._steps;
  }

  set steps(value: StepDTO[]) {
    this._steps = value;
  }

  private _reviews: ReviewList;

  get reviews(): ReviewDTO[] {
    return this._reviews;
  }

  set reviews(value: ReviewDTO[]) {
    this._reviews = value;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  private _routeSub: Subscription;

  get routeSub(): Subscription {
    return this._routeSub;
  }

  set routeSub(value: Subscription) {
    this._routeSub = value;
  }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      this.idRecipe = parseInt(this.idParam, 0);
    });

    this.loadRecipe();
    this.loadIngredients();
    this.loadSteps();
    this.loadReviews();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  updateSpice(nb: number) {
    this._spices = Array(nb).fill(0);
  }

  loadIngredients() {
    this.ingredientService
      .queryRecipeId(this.idRecipe)
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  postReview($event: ReviewDTO) {
    $event.idRecipe = this.recipe.idRecipe;
    this.reviewService
      .post($event)
      .subscribe(() => this.loadReviews());
  }

  deleteReviewInDB(review: ReviewDTO) {
    this.reviewService
      .delete(review.idUser, review.idRecipe)
      .subscribe(() => {
        this.deleteReview(review);
      });
  }

  private loadRecipe() {
    this.recipeService
      .queryId(this.idRecipe)
      .subscribe(recipes => this.recipe = recipes[0]);
  }

  private loadSteps() {
    console.log('STEPS');
    this.stepService
      .queryByRecipe(this.idRecipe)
      .subscribe(steps => {
        console.log('STEPS-2222222222222222');
        this.steps = steps;
        console.log(this.steps);
        console.log('STEPS-33333333333333333');
      }, error => {
        console.error(error);
      });
  }

  private loadReviews() {
    this.reviewService
      .queryByRecipe(this.idRecipe)
      .subscribe(reviews => this.reviews = reviews);
  }

  private deleteReview(review: ReviewDTO) {
    const index = this.reviews.indexOf(review);
    this.reviews.splice(index, 1);
  }
}
