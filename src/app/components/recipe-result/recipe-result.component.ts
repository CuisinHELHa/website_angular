import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RecipeDTO} from '../../DTOs/recipe-dto';
import {AuthenticationService} from '@app/services/authentication.service';

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent {
  @Output()
  private recipeDeleted: EventEmitter<RecipeDTO> = new EventEmitter<RecipeDTO>();

  constructor(public _authService: AuthenticationService) {
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

  updateSpice(nb: number) {
    this._spices = Array(nb).fill(0);
  }

  deleteRecipe() {
    this.recipeDeleted.next(this.recipe);
  }
}
