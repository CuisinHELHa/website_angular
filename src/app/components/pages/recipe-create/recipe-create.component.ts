import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IngredientList} from "../../../DTOs/ingredient-dto";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";
import {RECIPE_TYPE, RECIPE_TYPE_FILTER} from "../../../enumerations/recipe-type.enum";
import {UNIT, Unit} from "@app/enumerations/unit.enum";
import {RecipeDTO} from "@app/DTOs/recipe-dto";
import {StepDTO, StepList} from "@app/DTOs/step-dto";
import {ReviewDTO, ReviewList} from "@app/DTOs/review-dto";
import {StepService} from "@app/services/step.service";
import {RecipeService} from "@app/services/recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  @Output()
  private  recipePosted:EventEmitter<RecipeDTO> = new EventEmitter<RecipeDTO>();

  private _form: FormGroup = this.fb.group({
    nameRecipe: this.fb.control("", Validators.required),
    postDate: this.fb.control("", Validators.required),
    summary: this.fb.control("", Validators.required),
    persons: this.fb.control("", Validators.required),
    prepTime: this.fb.control("", Validators.required),
    spicesRate: this.fb.control("", Validators.required),
    recipeType: this.fb.control("", Validators.required)
  });

  private units:any[]=UNIT;
  private _filters:any[] = RECIPE_TYPE;
  private _ingredients: IngredientList = [];
  private  subscriptions: Subscription[] = [];
  private _recipe: RecipeDTO;
  private _spices:number[];
  private _steps: StepList;
  private _reviews: ReviewList;

  constructor(public ingredientService:IngredientService,
              private stepService: StepService,
              private recipeService: RecipeService,
              private fb: FormBuilder,
              private _authService: AuthenticationService) { }


  ngOnInit() {
    this.loadIngredients();
  }

  private loadIngredients():void{
    const sub: Subscription=this.ingredientService
      .query()
      .subscribe(ingredients => this._ingredients = ingredients);

    this.subscriptions.push(sub);

  }
  emitNewRecipe (){
    this.recipePosted.next();
    this._form.reset();
  }
  postRecipe($event: RecipeDTO) {
  $event.nameRecipe= this._form.get("nameRecipe").value;
  console.log(this._form.get("nameRecipe").value);
    const sub = this.recipeService
      .post($event)
      .subscribe();
    this.subscriptions.push(sub);
  }

  // postStep($event : StepDTO){
  //   const sub = this.stepService
  //     .post($event)
  //     .subscribe(()=>this.loadSteps())
  // }

  private loadRecipe() {
    const sub: Subscription = this.recipeService
      .query()
      .subscribe(recipes => this.recipe=recipes[0]);
    this.subscriptions.push(sub);
  }

  // private loadSteps()
  // {
  //   const sub: Subscription = this.stepService
  //     .queryByRecipe(this.idRecipe)
  //     .subscribe(steps => this.steps = steps);
  //   this.subscriptions.push(sub);
  // }

  get ingredients(): IngredientList {
    return this._ingredients;
  }

  set ingredients(value: IngredientList) {
    this._ingredients = value;
  }


  get recipe(): RecipeDTO {
    return this._recipe;
  }

  set recipe(value: RecipeDTO) {
    this._recipe = value;
  }
  get filters(): any[] {
    return this._filters;
  }


  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  set authService(value: AuthenticationService) {
    this._authService = value;
  }
}
