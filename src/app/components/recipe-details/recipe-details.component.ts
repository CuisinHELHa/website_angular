import {Component, Input, OnInit} from '@angular/core';
import {RecipeDTO} from "../../DTOs/recipe-dto";
import {StepDTO} from "../../DTOs/step-dto";
import {IngredientDTO} from "../../DTOs/ingredient-dto";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  private MOCK_STEPS: StepDTO[] = [{
    idRecipe: 1,
    stepNb: 1,
    step: "Couper 300 cubes de beurre"
  }, {
    idRecipe: 1,
    stepNb: 2,
    step: "faire fondre le beurre"
  }, {
    idRecipe: 1,
    stepNb: 3,
    step: "étaler le beurre sur la tartine"
  }, {
    idRecipe: 2,
    stepNb: 1,
    step: "étape ne devant pas apparaitre"
  }];
  private MOCK_INGREDIENT: IngredientDTO[] = [{
    nameIngredient: "Beurre",

  }];

  constructor() {
  }

  private _recipe: RecipeDTO;

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  @Input()
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

  ngOnInit() {
  }

  updateSpice(nb: number) {
    this._spices = Array(nb).fill(0);
  }


}
