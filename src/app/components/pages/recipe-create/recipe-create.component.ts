import { Component, OnInit } from '@angular/core';
import {IngredientList} from "../../../DTOs/ingredient-dto";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";
import {RECIPE_TYPE, RECIPE_TYPE_FILTER} from "../../../enumerations/recipe-type.enum";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  private filters:any[] = RECIPE_TYPE;
  private _ingredients: IngredientList = [];
  private  subscriptions: Subscription[] = [];
  constructor(public ingredientService:IngredientService) { }

  ngOnInit() {
    this.loadIngredients();
  }

  private loadIngredients():void{
    console.log("plop");
    const sub: Subscription=this.ingredientService
      .query()
      .subscribe(ingredients => this._ingredients = ingredients);

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

}
