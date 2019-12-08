import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeDTO} from "../../DTOs/recipe-dto";
import {Subscription} from "rxjs";
import {RecipeService} from "@app/services/recipe.service";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {

  @Output()
  private recipeDeleted:EventEmitter<RecipeDTO> = new EventEmitter<RecipeDTO>();
  id: number = 1;
  type: boolean = true;

  constructor(private _authService: AuthenticationService) {
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

    deleteRecipe() {
      this.recipeDeleted.next(this.recipe);
    }
}
