import {Component, Input, OnInit} from '@angular/core';
import {RecipeDTO} from "../../../DTOs/recipe-dto";
import {StepDTO, StepList} from "../../../DTOs/step-dto";
import {IngredientDTO, IngredientList} from "../../../DTOs/ingredient-dto";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  private _recipe: RecipeDTO;
  private _spices:number[];
  private _ingredients: IngredientList;
  private _steps: StepList;

  private MOCK_STEPS: StepList = [{
    idRecipe: 1,
    stepNb: 1,
    step: "Couper 300 cubes de beurre"
  },{
    idRecipe: 1,
    stepNb: 2,
    step: "faire fondre le beurre"
  },{
    idRecipe: 1,
    stepNb: 3,
    step: "étaler le beurre sur la tartine"
  },{
    idRecipe: 2,
    stepNb: 1,
    step: "étape ne devant pas apparaitre"
  }];

  private MOCK_INGREDIENT: IngredientList = [{
    nameIngredient: "Beurre",

  }];

  constructor() { }

  ngOnInit() {
    this.ingredients=this.MOCK_INGREDIENT;
    this.steps = this.MOCK_STEPS;
  }

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  @Input()
  set recipe(value: RecipeDTO) {
    this._recipe = value;
    this.updateSpice(value.spiceRate);
  }

  get spices(): number[] {
    return this._spices;
  }

  set spices(value: number[]) {
    this._spices = value;
  }

  get steps(): StepDTO[] {
    return this._steps;
  }

  set steps(value: StepDTO[]) {
    this._steps = value;
  }
  get ingredients(): IngredientDTO[] {
    return this._ingredients;
  }

  set ingredients(value: IngredientDTO[]) {
    this._ingredients = value;
  }

  updateSpice(nb:number){
    this._spices = Array(nb).fill(0);
  }


}
