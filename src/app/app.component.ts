import {Component, OnInit} from '@angular/core';
import {RecipeDTO} from "./DTOs/recipe-dto";
import {AppState} from "./enumerations/app-state.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'pCuisinHELHa';
  private _selectedRecipe: RecipeDTO;
  private _currentState: AppState;

  private nullRecipe: RecipeDTO = {
    idRecipe: -1,
    idUser: 1,
    nameRecipe: "",
    postDate: "",
    summary: "",
    persons: 0,
    prepTime: 0,
    spiceRate: 0,
    recipeType: ""
  };

  ngOnInit(): void {
    this.unselectRecipe();
    this._currentState = AppState.RECIPE_SEARCH;
  }

  get selectedRecipe(): RecipeDTO {
    return this._selectedRecipe;
  }

  set selectedRecipe(value: RecipeDTO) {
    this.currentState = (value.idRecipe > -1)? AppState.RECIPE_DETAILS : AppState.RECIPE_SEARCH;
    this._selectedRecipe = value;
  }

  get currentState(): AppState {
    return this._currentState;
  }

  set currentState(value: AppState) {
    this._currentState = value;
  }

  unselectRecipe() {
    this._selectedRecipe = this.nullRecipe;
  }
}
