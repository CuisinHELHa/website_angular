import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeDTO, RecipeList} from "../../DTOs/recipe-dto";
import {RECIPE_TYPE_FILTER, RecipeType} from "../../enumerations/recipe-type.enum";
import {RecipePipe} from "../../pipes/recipe-pipe.pipe";

@Component({
  selector: 'app-recipe-results-list',
  templateUrl: './recipe-results-list.component.html',
  styleUrls: ['./recipe-results-list.component.css']
})


export class RecipeResultsListComponent implements OnInit {

  @Output()
  readonly FILTERS: any[] = [{
    id: "All",
    value: RecipeType.ALL
  },
    {
      id: "Entrée",
      value: RecipeType.ENTREE
    },
    {
      id: "Plat",
      value: RecipeType.PLAT
    },
    {
      id: "Dessert",
      value: RecipeType.DESSERT
    }];
  private MOCK_RECIPE: RecipeList = [{
    idRecipe: 1,
    idUser: 1,
    nameRecipe: "tartine au beurre",
    postDate: "30-11-2019",
    summary: "recette simple pour une tartine au beurre",
    persons: 1,
    prepTime: 5,
    spiceRate: 1,
    recipeType: "Plat",
    pseudo: "niborobin"
  }];

  filterSelected: RecipeType = RecipeType.ALL;
  private _recipes: RecipeList;
  private _filteredRecipes: RecipeList;
  @Output()
  recipeSelected: EventEmitter<RecipeDTO> = new EventEmitter<RecipeDTO>();
  private filters:any[] = RECIPE_TYPE_FILTER;

  constructor() { }

  @Input()
  get recipes(): RecipeDTO[] {
    return this._recipes;
  }

  set recipes(value: RecipeDTO[]) {
    this._recipes = value;
    this.updateFilteredRecipes();
  }

  get filteredRecipes(): RecipeDTO[] {
    return this._filteredRecipes;
  }

  set filteredRecipes(value: RecipeDTO[]) {
    this._filteredRecipes = value;
  }

  ngOnInit() {
    this.recipes = this.MOCK_RECIPE;
  }

  updateFilteredRecipes() {
    this._filteredRecipes = new RecipePipe()
      .transform(this._recipes, this.filterSelected);
  }

  loadRecipe(recipe: RecipeDTO) {
    this.recipeSelected.next(recipe);
  }
}
