import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeDTO, RecipeList} from "../../../DTOs/recipe-dto";
import {RECIPE_TYPE_FILTER, RecipeType} from "../../../enumerations/recipe-type.enum";
import {RecipePipe} from "../../../pipes/recipe-pipe.pipe";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})



export class RecipeSearchComponent implements OnInit {

  filterSelected: RecipeType = RecipeType.ALL;
  private searchText: string = "";
  private _recipes: RecipeList;
  private _filteredRecipes: RecipeList;
  private filters:any[] = RECIPE_TYPE_FILTER;

  private subscriptions: Subscription[]=[];

  constructor(private recipeService: RecipeService,
              public route:ActivatedRoute,
              public router:Router) { }

  ngOnInit() {
    const sub = this.route.paramMap.subscribe(params =>{
      this.searchText = params.get("text");
      if(this.searchText == null)
      {
        this.searchText="";
      }
      console.log(this.searchText);
      this.loadRecipe();
    });

    this.subscriptions.push(sub);
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
        .queryText(this.searchText)
        .subscribe(recipes => this.recipes=recipes);
    this.subscriptions.push(sub);
  }
}
