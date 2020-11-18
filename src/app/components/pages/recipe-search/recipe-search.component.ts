import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipeDTO, RecipeList} from '../../../DTOs/recipe-dto';
import {RECIPE_TYPE_FILTER, RecipeType} from '../../../enumerations/recipe-type.enum';
import {RecipePipe} from '../../../pipes/recipe-pipe.pipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ok} from 'assert';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit, OnDestroy {

  filterSelected: RecipeType = RecipeType.ALL;
  private _searchText = '';
  private _recipes: RecipeList;
  private _filteredRecipes: RecipeList;
  private _filters: any[] = RECIPE_TYPE_FILTER;

  private subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    const sub = this.route.paramMap.subscribe(params => {
      this._searchText = params.get('text');
      if (this._searchText == null) {
        this._searchText = '';
      }
      this.loadRecipe();
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

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

  updateFilteredRecipes() {
    this._filteredRecipes = new RecipePipe()
        .transform(this._recipes, this.filterSelected);
  }

  loadRecipe() {
    const sub: Subscription = this.recipeService
        .queryText(this._searchText)
        .subscribe(recipes => this.recipes = recipes);
    this.subscriptions.push(sub);

  }

  deleteRecipeInDB($event: RecipeDTO) {
    const sub = this.recipeService
        .delete($event.idRecipe)
        .subscribe(() => {
            this.deleteRecipe($event);
        });
    this.subscriptions.push(sub);
  }

  deleteRecipe(recipe: RecipeDTO) {
    const index = this.recipes.indexOf(recipe);
    this._recipes.splice(index, 1);
    this.updateFilteredRecipes();
  }

  get filters(): any[] {
    return this._filters;
  }

  set filters(value: any[]) {
    this._filters = value;
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }
}
