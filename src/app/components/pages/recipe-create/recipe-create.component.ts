import { Component, OnInit } from '@angular/core';
import {IngredientList} from "../../../DTOs/ingredient-dto";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";
import {RECIPE_TYPE, RECIPE_TYPE_FILTER} from "../../../enumerations/recipe-type.enum";
import {UNIT, Unit} from "@app/enumerations/unit.enum";
import {RecipeDTO} from "@app/DTOs/recipe-dto";
import {StepList} from "@app/DTOs/step-dto";
import {ReviewDTO, ReviewList} from "@app/DTOs/review-dto";
import {StepService} from "@app/services/step.service";
import {RecipeService} from "@app/services/recipe.service";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  private filters:any[] = RECIPE_TYPE;

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
              private recipeService: RecipeService,) { }


  ngOnInit() {
    this.loadIngredients();
  }

  private loadIngredients():void{
    const sub: Subscription=this.ingredientService
      .query()
      .subscribe(ingredients => this._ingredients = ingredients);

    this.subscriptions.push(sub);

  }
  postRecipe($event: RecipeDTO) {
    // $event.idRecipe = this.recipe.idRecipe;
    // const sub = this.recipeService
    //   .post($event)
    //   .subscribe(()=>this.loadRecipe());
    // this.subscriptions.push(sub);
  }

  private loadRecipe() {
    const sub: Subscription = this.recipeService
      .query()
      .subscribe(recipes => this.recipe=recipes[0]);
    this.subscriptions.push(sub);
  }

  addRecipe() {

  }

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
}
