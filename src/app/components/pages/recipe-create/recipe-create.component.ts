import { Component, OnInit } from '@angular/core';
import {IngredientList} from "../../../DTOs/ingredient-dto";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  private ingredients: IngredientList = [];
  private  subscriptions: Subscription[] = [];
  constructor(public ingredientService:IngredientService) { }

  ngOnInit() {
    this.loadIngredients();
  }

  private loadIngredients():void{
    const sub: Subscription=this.ingredientService
      .query()
      .subscribe(ingredients => this.ingredients = ingredients);

    this.subscriptions.push(sub);

  }

  addRecipe() {

  }
}
