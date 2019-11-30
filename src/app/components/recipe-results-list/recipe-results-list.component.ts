import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeDTO, RecipeList} from "../../DTOs/recipe-dto";
import {RecipeType} from "../../enumerations/recipe-type.enum";
import {RecipePipe} from "../../pipes/recipe-pipe.pipe";

@Component({
  selector: 'app-recipe-results-list',
  templateUrl: './recipe-results-list.component.html',
  styleUrls: ['./recipe-results-list.component.css']
})
export class RecipeResultsListComponent implements OnInit {
  filterSelected: RecipeType = RecipeType.ALL;
  private _recipes: RecipeList;
  private _filteredRecipes: RecipeList;

  readonly FILTERS: any[]=[{
  id:"All",
  value: RecipeType.ALL
},
{
  id:"Entrée",
  value: RecipeType.ENTREE
},
{
  id:"Plat",
  value: RecipeType.PLAT
},
{
  id:"Dessert",
  value: RecipeType.DESSERT
}];


  constructor() { }

  ngOnInit() {
  }

  get recipes(): RecipeDTO[] {
    return this._recipes;
  }

  set recipes(value: RecipeDTO[]) {
    this._recipes = value;
  }

  get filteredRecipes(): RecipeDTO[] {
    return this._filteredRecipes;
  }

  set filteredRecipes(value: RecipeDTO[]) {
    this._filteredRecipes = value;
  }

  updateFilteredRecipes() {
    this._filteredRecipes = new RecipePipe()
        .transform(this._recipes, this.filterSelected);
  }
}
