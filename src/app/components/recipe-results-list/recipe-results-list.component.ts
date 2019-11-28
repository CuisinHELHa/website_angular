import { Component, OnInit } from '@angular/core';
import {RecipeDTO, RecipeList} from "../../DTOs/recipe-dto";

@Component({
  selector: 'app-recipe-results-list',
  templateUrl: './recipe-results-list.component.html',
  styleUrls: ['./recipe-results-list.component.css']
})
export class RecipeResultsListComponent implements OnInit {

  private _recipes: RecipeList;

  constructor() { }

  ngOnInit() {
  }

}
